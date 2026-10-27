"use client";

import { useEffect, useRef } from "react";

/* Interactive underwater scene (canvas). Fills its parent box and has transparent,
   feathered edges, so it works on any page background. */
export default function OceanBanner({ className = "" }) {
  const ref = useRef(null);

  useEffect(() => mountOcean(ref.current), []);

  return (
    <canvas
      ref={ref}
      role="img"
      aria-label="Looking up through deep teal water toward the sun, with a loose school of fish drifting overhead"
      className={`block h-full w-full ${className}`}
    />
  );
}

function mountOcean(canvas) {
  const ctx = canvas.getContext('2d');
  const rnd = (a, b) => a + Math.random() * (b - a);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let raf = 0, dead = false, W = 0, H = 0, dpr = 1, k = 1, m = 0, mask, t = 0, last = performance.now(), visible = true, ready = false;
  let sunX = 0, sunY = 0, lc, lctx, grainP;
  const mouse = { x: 0, y: 0, in: false };
  let fish = [], dots = [], motes = [];

  // ---------- tileable cloud textures (pre-rendered once) ----------
  function hash(x, y) {
    let h = (Math.imul(x, 374761393) + Math.imul(y, 668265263)) | 0;
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
  }
  function vn(x, y, P, sd) {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const s = xf * xf * (3 - 2 * xf), u = yf * yf * (3 - 2 * yf), X = i => ((i % P) + P) % P, o = sd * 57, p = sd * 91;
    const a = hash(X(xi) + o, X(yi) + p), b = hash(X(xi + 1) + o, X(yi) + p), c = hash(X(xi) + o, X(yi + 1) + p), d = hash(X(xi + 1) + o, X(yi + 1) + p);
    return a + (b - a) * s + (c - a) * u + (a - b - c + d) * s * u;
  }
  const N = 192;
  function makeTile(bright, sd) {
    const c = document.createElement('canvas'); c.width = c.height = N;
    const g = c.getContext('2d'), im = g.createImageData(N, N);
    for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) {
      let s = 0, a = .5, f = 1, n = 0;
      for (let o = 0; o < 5; o++) { s += a * vn(i / N * 4 * f, j / N * 4 * f, 4 * f, sd); n += a; f *= 2; a *= .5; }
      s /= n;
      const al = bright === 2 ? Math.pow(1 - Math.abs(2 * s - 1), 7) : bright ? clamp((s - .47) * 2.6, 0, 1) : clamp((.53 - s) * 2.6, 0, 1), q = (j * N + i) * 4;
      im.data[q] = bright ? 175 : 4; im.data[q + 1] = bright ? 255 : 34; im.data[q + 2] = bright ? 242 : 64; im.data[q + 3] = al * 255;
    }
    g.putImageData(im, 0, 0); return c;
  }
  const tiles = { a: makeTile(true, 1), b: makeTile(true, 2), d: makeTile(false, 3), c: makeTile(2, 4) }; // c = thin bright veins (caustics)
  const pats = new Map();
  // seamless: a repeating pattern, scaled and scrolled by matrix (no tile edges)
  function layer(c, key, S, ox, oy, alpha, comp) {
    const id = key + (c === ctx ? 'm' : 'l');
    if (!pats.has(id)) pats.set(id, c.createPattern(tiles[key], 'repeat'));
    const p = pats.get(id);
    p.setTransform(new DOMMatrix([S / N, 0, 0, S / N, ox, oy]));
    c.globalAlpha = alpha; c.globalCompositeOperation = comp; c.fillStyle = p; c.fillRect(0, 0, W, H);
    c.globalAlpha = 1; c.globalCompositeOperation = 'source-over';
  }

  // ---------- ragged, soft, rounded-rectangle edge ----------
  // ---------- living edge: a squarish rounded rectangle whose border is gently warped by slowly drifting noise ----------
  // Deterministic (same shape on every load). Computed at 1/5 resolution, since the edge is soft anyway.
  // Two small canvases: `mask` (alpha, the shape) and `rimC` (a dark navy rim that deepens the border).
  let mg, mim, rg, rim, rimC, mw = 0, mh = 0, mTick = 0;
  function setupMask() {
    mw = Math.ceil(W / 5); mh = Math.ceil(H / 5);
    mask = document.createElement('canvas'); mask.width = mw; mask.height = mh;
    mg = mask.getContext('2d'); mim = mg.createImageData(mw, mh);
    rimC = document.createElement('canvas'); rimC.width = mw; rimC.height = mh;
    rg = rimC.getContext('2d'); rim = rg.createImageData(mw, mh);
    for (let i = 0; i < rim.data.length; i += 4) { rim.data[i] = 3; rim.data[i + 1] = 22; rim.data[i + 2] = 50; }
    ctx.imageSmoothingQuality = 'high';
    updateMask();
  }
  function updateMask() {
    const mn = Math.min(W, H), A = mn * .032, inset = A * .8 + 4, a = W / 2 - inset, b = H / 2 - inset;
    const feather = Math.max(9, W * .02), rimW = feather * 3.2;   // px: crisp-ish edge, then a darker rim
    const px = mim.data, rp = rim.data, fx = 5 / W, fy = 5 / H, t1 = t * .08, t2 = t * .06;
    for (let j = 0; j < mh; j++) for (let i = 0; i < mw; i++) {
      const x = i * 5, y = j * 5;
      const wx = (vn(x * fx + t1, y * fy + 3, 1024, 11) - .5) * A + (vn(x * fx * 3 + 5 - t1 * 1.7, y * fy * 3 + t2 * 1.3 + 1, 1024, 41) - .5) * A * .45;
      const wy = (vn(x * fx + 7, y * fy - t2, 1024, 23) - .5) * A + (vn(x * fx * 3 - t2 * 1.5, y * fy * 3 + 9 + t1 * 1.2, 1024, 53) - .5) * A * .45;
      const ex = x + wx - W / 2, ey = y + wy - H / 2, nx = ex / a, ny = ey / b, n2 = nx * nx, m2 = ny * ny;
      const n4 = n2 * n2, m4 = m2 * m2, n8 = n4 * n4, m8 = m4 * m4, d = Math.pow(n8 * n8 + m8 * m8, .0625) + (vn(x * fx * 6 - t1 * 2, y * fy * 6 + t2 * 2, 1024, 31) - .5) * .012;
      const dpx = Math.hypot(ex, ey) * (1 - d) / Math.max(d, .2);   // approx. distance to the edge in px
      const al = clamp(dpx / feather, 0, 1), r = clamp(dpx / rimW, 0, 1), q = (j * mw + i) * 4 + 3;
      px[q] = al * al * (3 - 2 * al) * 255;
      rp[q] = .45 * (1 - r) * (1 - r) * 255;
    }
    mg.putImageData(mim, 0, 0); rg.putImageData(rim, 0, 0);
  }

  // ---------- soft fish sprites: blurred, flecked, translucent (no hard edges) ----------
  const SC = 2;
  function soft(g, blur, draw) {
    g.save(); g.shadowColor = 'rgb(4,28,48)'; g.shadowBlur = blur; g.shadowOffsetX = 3000;
    g.scale(SC, SC); g.translate(-3000 / SC, 0); g.fillStyle = '#000'; g.beginPath(); draw(g); g.fill(); g.restore();
  }
  function speckle(g, w, h, n) {
    g.globalCompositeOperation = 'destination-out';
    for (let i = 0; i < n; i++) { g.fillStyle = `rgba(0,0,0,${rnd(.25, .6)})`; g.beginPath(); g.arc(rnd(0, w), rnd(0, h), rnd(.5, 1.6) * SC, 0, 6.283); g.fill(); }
    g.globalCompositeOperation = 'source-over';
  }
  function makeSprite(L) {
    const bw = Math.ceil(L * 1.3), bh = Math.ceil(L * .7), blur = Math.max(2, L * .14) * SC;
    const body = document.createElement('canvas'); body.width = bw * SC; body.height = bh * SC;
    const g = body.getContext('2d');
    soft(g, blur, c => {
      c.translate(bw / 2, bh / 2);
      c.moveTo(L * .5, 0); c.bezierCurveTo(L * .45, -L * .13, L * .1, -L * .2, -L * .15, -L * .12);
      c.bezierCurveTo(-L * .3, -L * .07, -L * .38, -L * .03, -L * .45, -L * .02); c.lineTo(-L * .45, L * .02);
      c.bezierCurveTo(-L * .38, L * .03, -L * .3, L * .07, -L * .15, L * .13); c.bezierCurveTo(L * .1, L * .2, L * .45, L * .12, L * .5, 0);
      c.moveTo(L * .05, -L * .16); c.lineTo(-L * .12, -L * .27); c.lineTo(-L * .18, -L * .1);
    });
    speckle(g, bw * SC, bh * SC, Math.floor(L * .5));
    const tw = Math.ceil(L * .4), th = Math.ceil(L * .5), jx = tw - L * .06;
    const tail = document.createElement('canvas'); tail.width = tw * SC; tail.height = th * SC;
    const gt = tail.getContext('2d');
    soft(gt, blur, c => { c.translate(jx, th / 2); c.moveTo(L * .05, 0); c.lineTo(-L * .25, -L * .17); c.lineTo(-L * .16, 0); c.lineTo(-L * .25, L * .17); c.closePath(); });
    return { body, tail, L, bw, bh, tw, th, jx };
  }
  const sprites = [10, 14, 18, 23, 29].map(makeSprite), bigSprite = makeSprite(64);

  function init() {
    fish = Array.from({ length: 34 }, () => {
      const rf = .04 + Math.pow(Math.random(), .85) * .27, ci = Math.min(4, Math.floor(Math.pow(Math.random(), 1.4) * 5));
      return mk(rf, rnd(.85, 1.15), false, sprites[ci], rnd(.4, .7));
    });
    dots = Array.from({ length: 55 }, () => mk(rnd(.015, .2), rnd(.7, 1.5), true, null, rnd(.2, .45)));
    // two huge, very faint fish far below the surface add depth
    fish.push(mk(.34, .8, false, bigSprite, .15), mk(.27, .75, false, bigSprite, .11));
    // drifting motes that only glint when they are near the sunlight
    motes = Array.from({ length: 50 }, () => ({ x: rnd(0, W), y: rnd(0, H), v: rnd(2, 9), r: rnd(.5, 1.3), ph: rnd(0, 6.283) }));
  }
  function mk(rf, s, dot, spr, a) {
    return { rf, th: rnd(0, 6.283), w: (.003 + .006 * (1 - rf / .3)) * rnd(.7, 1.3), ph: rnd(0, 6.283), s, dot, spr, a,
      px: 0, py: 0, ox: 0, oy: 0, ang: rnd(0, 6.283), fresh: true };
  }

  function resize() {
    W = canvas.clientWidth; H = canvas.clientHeight; if (!W || !H) return;
    dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = W * dpr; canvas.height = H * dpr;
    k = W / 820; m = Math.min(W, H) * .075;
    sunX = W * .35; sunY = H * .22;
    lc = document.createElement('canvas'); lc.width = Math.ceil(W / 2); lc.height = Math.ceil(H / 2); lctx = lc.getContext('2d');
    pats.clear(); setupMask();
    if (!ready) { init(); ready = true; }
    [...fish, ...dots].forEach(f => { f.fresh = true; f.ox = f.oy = 0; });
  }

  // ---------- update: a loose, slow drift far above; the sun never moves ----------
  function update(dt) {
    const cx = W * .42, cy = H * .38;
    for (const f of [...fish, ...dots]) {
      f.th += f.w * dt * (1 + .3 * Math.sin(t * .3 + f.ph));
      const rr = f.rf * W * (1 + .14 * Math.sin(t * .35 + f.ph) + .06 * Math.sin(t * .9 + f.ph * 2));
      const gx = cx + Math.cos(f.th) * rr * 1.15 + f.ox, gy = cy + Math.sin(f.th) * rr * .65 + f.oy;
      if (f.fresh) { f.px = gx; f.py = gy; f.fresh = false; }
      const vx = (gx - f.px) * .06 * dt, vy = (gy - f.py) * .06 * dt;
      f.px += vx; f.py += vy;
      if (!f.dot && Math.hypot(vx, vy) > .04) { let d = Math.atan2(vy, vx) - f.ang; d = Math.atan2(Math.sin(d), Math.cos(d)); f.ang += d * .1; }
      if (mouse.in) { const dx = f.px - mouse.x, dy = f.py - mouse.y, d = Math.hypot(dx, dy) || 1; if (d < 70 * k) { f.ox += dx / d * (70 * k - d) * .02 * dt; f.oy += dy / d * (70 * k - d) * .02 * dt; } }
      const dec = Math.pow(.975, dt); f.ox *= dec; f.oy *= dec;
    }
  }

  function drawFish(f) {
    const sp = f.spr, ss = f.s * k * (.8 + .5 * f.rf / .3), wag = Math.sin(t * 3.2 + f.ph) * .35;
    const dist = Math.hypot(f.px - sunX, f.py - sunY), a = f.a * (.85 + .15 * Math.sin(t * 1.7 + f.ph)) * clamp(dist / (W * .12), .3, 1);
    ctx.save(); ctx.translate(f.px, f.py); ctx.rotate(f.ang); ctx.globalAlpha = a;
    ctx.drawImage(sp.body, -sp.bw / 2 * ss, -sp.bh / 2 * ss, sp.bw * ss, sp.bh * ss);
    ctx.translate(-sp.L * .45 * ss, 0); ctx.rotate(wag);
    ctx.drawImage(sp.tail, -sp.jx * ss, -sp.th / 2 * ss, sp.tw * ss, sp.th * ss);
    ctx.restore();
  }

  function draw() {
    // light layer: bright wisps, only near the sun (half resolution)
    lctx.setTransform(.5, 0, 0, .5, 0, 0); lctx.globalCompositeOperation = 'source-over'; lctx.clearRect(0, 0, W, H);
    const S = Math.max(W, H);
    layer(lctx, 'a', S * .55, t * 7 * k, t * 3 * k, .6, 'source-over');
    layer(lctx, 'b', S * .8, -t * 5 * k, t * 4 * k, .4, 'lighter');
    layer(lctx, 'c', S * .32, t * 9 * k, t * 6 * k, .4, 'lighter');
    layer(lctx, 'c', S * .26, -t * 7 * k, t * 8 * k, .3, 'lighter');
    let g = lctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, W * .3);
    g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(.45, 'rgba(0,0,0,.55)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    lctx.globalCompositeOperation = 'destination-in'; lctx.fillStyle = g; lctx.fillRect(0, 0, W, H); lctx.globalCompositeOperation = 'source-over';

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H);
    g = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, W * .95);
    [[0, '#d8fbf1'], [.025, '#a9f2e8'], [.1, '#62d3d4'], [.28, '#2aa9bd'], [.5, '#12789a'], [.75, '#094a6e'], [1, '#05294a']].forEach(([o, c]) => g.addColorStop(o, c));
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    g = ctx.createLinearGradient(W * .3, H * .3, W, H); g.addColorStop(0, 'rgba(2,14,40,0)'); g.addColorStop(1, 'rgba(2,14,40,.6)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    layer(ctx, 'd', S * 1.0, t * 3 * k, -t * 4 * k, .3, 'source-over');
    layer(ctx, 'a', S * .75, t * 8 * k, t * 3 * k, .1, 'lighter');
    layer(ctx, 'b', S * 1.2, -t * 5 * k, t * 6 * k, .09, 'lighter');
    layer(ctx, 'c', S * .4, t * 6 * k, -t * 5 * k, .05, 'lighter');
    ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = .55; ctx.drawImage(lc, 0, 0, W, H); ctx.globalAlpha = 1;

    for (const q of motes) {
      const y = ((q.y - t * q.v * k) % H + H) % H, x = q.x + Math.sin(t * .3 + q.ph) * 12 * k, near = clamp(1 - Math.hypot(x - sunX, y - sunY) / (W * .5), 0, 1);
      ctx.fillStyle = `rgba(215,255,245,${.5 * near * (.5 + .5 * Math.sin(t * 1.6 + q.ph))})`; ctx.beginPath(); ctx.arc(x, y, q.r * k, 0, 6.283); ctx.fill();
    }

    // the sun: fixed, only a very gentle shimmer in brightness
    const sh = .94 + .06 * Math.sin(t * .9);
    g = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, W * .08); g.addColorStop(0, `rgba(215,255,242,${.4 * sh})`); g.addColorStop(1, 'rgba(215,255,242,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    g = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, W * .014); g.addColorStop(0, `rgba(255,255,236,${sh})`); g.addColorStop(.4, `rgba(255,252,215,${.85 * sh})`); g.addColorStop(1, 'rgba(255,250,200,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    ctx.globalCompositeOperation = 'source-over';

    for (const d of dots) { ctx.fillStyle = `rgba(4,30,50,${d.a * (.7 + .3 * Math.sin(t * 1.3 + d.ph))})`; ctx.beginPath(); ctx.arc(d.px, d.py, d.s * k, 0, 6.283); ctx.fill(); }
    fish.forEach(drawFish);

    g = ctx.createRadialGradient(W / 2, H / 2, W * .3, W / 2, H / 2, W * .72); g.addColorStop(0, 'rgba(3,22,48,0)'); g.addColorStop(1, 'rgba(3,22,48,.5)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // fine film grain so the water doesn't look digitally smooth
    if (!grainP) {
      const gc = document.createElement('canvas'); gc.width = gc.height = 128;
      const gg = gc.getContext('2d'), im = gg.createImageData(128, 128);
      for (let i = 0; i < im.data.length; i += 4) { im.data[i] = im.data[i + 1] = im.data[i + 2] = Math.random() * 255; im.data[i + 3] = 255; }
      gg.putImageData(im, 0, 0); grainP = ctx.createPattern(gc, 'repeat');
    }
    const gf = Math.floor(t * 20); grainP.setTransform(new DOMMatrix([1, 0, 0, 1, gf * 37 % 128, gf * 91 % 128]));
    ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = .1; ctx.fillStyle = grainP; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-atop'; ctx.drawImage(rimC, 0, 0, W, H);
    ctx.globalCompositeOperation = 'destination-in'; ctx.drawImage(mask, 0, 0, W, H); ctx.globalCompositeOperation = 'source-over';
  }

  function frame(now) {
    if (dead) return;
    raf = requestAnimationFrame(frame);
    if (!visible || !ready) { last = now; return; }
    const dt = Math.min((now - last) / 16.67, 3) * (reduce ? .4 : 1); last = now; t += dt * .01667;
    update(dt); if ((mTick++ & 1) === 0) updateMask(); draw();
  }

  // ---------- input: only the fish react; window-level so page scrolling is never blocked ----------
  let touchTimer;
  const ac = new AbortController();
  const on = (target, type, fn) => target.addEventListener(type, fn, { signal: ac.signal });
  const local = e => { const r = canvas.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; };
  const inside = p => p.x > 0 && p.x < W && p.y > 0 && p.y < H;
  on(window, 'pointermove', e => { const p = local(e); mouse.x = p.x; mouse.y = p.y; mouse.in = inside(p); clearTimeout(touchTimer); });
  on(window, 'pointerdown', e => {
    const p = local(e); if (!inside(p)) return;
    mouse.x = p.x; mouse.y = p.y; mouse.in = true;
    for (const f of [...fish, ...dots]) { const dx = f.px - p.x, dy = f.py - p.y, d = Math.hypot(dx, dy) || 1; f.ox += dx / d * rnd(40, 90) * k; f.oy += dy / d * rnd(40, 90) * k; }
  });
  on(window, 'pointerup', e => { if (e.pointerType !== 'mouse') touchTimer = setTimeout(() => mouse.in = false, 4000); });
  on(document.documentElement, 'mouseleave', () => mouse.in = false);
  const ro = new ResizeObserver(resize); ro.observe(canvas);
  const io = new IntersectionObserver(es => visible = es[0].isIntersecting); io.observe(canvas);
  resize(); raf = requestAnimationFrame(frame);

  return () => { dead = true; cancelAnimationFrame(raf); clearTimeout(touchTimer); ac.abort(); ro.disconnect(); io.disconnect(); };
}