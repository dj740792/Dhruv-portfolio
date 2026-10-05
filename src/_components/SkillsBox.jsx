
"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { TECH_STACK } from "@/constants/index";

export default function SkillsBox() {
  const sceneRef = useRef(null);
  const imageElementsRef = useRef(new Map());
  const [imagesLoaded, setImagesLoaded] = useState(TECH_STACK.length === 0);
  const [sceneSize, setSceneSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    let loadedCount = 0;
    const totalImages = TECH_STACK.length;
    let cancelled = false;

    imageElementsRef.current.clear();

    if (totalImages === 0) return undefined;

    TECH_STACK.forEach((item) => {
      const img = new window.Image();
      img.onload = () => {
        if (cancelled) return;
        imageElementsRef.current.set(item.icon, img);
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };

      img.onerror = () => {
        if (cancelled) return;
        console.error(`Failed to load image at path: ${item.icon}`);
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };

      img.src = item.icon;
    });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const container = sceneRef.current;
    if (!container) return undefined;

    const resizeObserver = new ResizeObserver(([entry]) => {
      const width = Math.round(entry.contentRect.width);
      const height = Math.round(entry.contentRect.height);

      setSceneSize((currentSize) =>
        currentSize.width === width && currentSize.height === height
          ? currentSize
          : { width, height },
      );
    });

    resizeObserver.observe(container);
    return () => resizeObserver.disconnect();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;

    const container = sceneRef.current;
    if (!container) return;

    const { width, height } = sceneSize;

    if (!width || !height) return;

    const useConfiguredRadii = window.matchMedia("(min-width: 1024px)").matches;
    const engine = Matter.Engine.create();
    engine.world.gravity.y = 1.2;

    const render = Matter.Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
        showAngleIndicator: false,
      },
    });

    const wallThickness = 40;
    const wallOptions = {
      isStatic: true,
      render: { visible: false },
    };

    const ground = Matter.Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width,
      wallThickness,
      wallOptions
    );

    const leftWall = Matter.Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height * 2,
      wallOptions
    );

    const rightWall = Matter.Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height * 2,
      wallOptions
    );

    const loadedItems = TECH_STACK.filter((item) =>
      imageElementsRef.current.has(item.icon)
    );

    const placedBalls = [];
    const balls = loadedItems.map((item) => {
      const configuredRadius = item.radius ?? 22;
      const radius = useConfiguredRadii
        ? configuredRadius
        : Math.min(configuredRadius, Math.max(12, width * 0.075));
      const minY = Math.max(radius, height * 0.25);
      const maxY = Math.max(minY, height - radius - 12);
      let startX = radius;
      let startY = minY;

      for (let attempt = 0; attempt < 60; attempt++) {
        startX = radius + Math.random() * Math.max(0, width - radius * 2);
        startY = minY + Math.random() * Math.max(0, maxY - minY);

        const overlaps = placedBalls.some(
          (ball) =>
            Matter.Vector.magnitude(
              Matter.Vector.sub(ball.position, { x: startX, y: startY }),
            ) < ball.radius + radius + 4,
        );

        if (!overlaps) break;
      }

      const body = Matter.Bodies.circle(
        Math.max(radius, Math.min(width - radius, startX)),
        Math.max(radius, Math.min(height - radius, startY)),
        radius,
        {
          restitution: 0.5,
          friction: 0.3,
          density: 0.04,
          render: {
            visible: false,
          },
        }
      );

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 2,
        y: Math.random() * 0.5,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
      body.iconPath = item.icon;
      placedBalls.push({ position: body.position, radius });
      return body;
    });

    Matter.Composite.add(engine.world, [
      ground,
      leftWall,
      rightWall,
      ...balls,
    ]);

    Matter.Events.on(render, "afterRender", () => {
      const context = render.context;

      balls.forEach((body) => {
        const { position, angle, circleRadius } = body;
        const img = imageElementsRef.current.get(body.iconPath);

        if (!img || !circleRadius) return;

        context.save();
        context.translate(position.x, position.y);
        context.rotate(angle);
        context.beginPath();
        context.arc(0, 0, circleRadius, 0, 2 * Math.PI);
        context.closePath();
        context.clip();

        context.drawImage(
          img,
          -circleRadius,
          -circleRadius,
          circleRadius * 2,
          circleRadius * 2
        );

        context.restore();
      });
    });

    const mouse = Matter.Mouse.create(render.canvas);

    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false },
      },
    });

    Matter.Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    render.canvas.style.outline = "none";
    render.canvas.style.webkitUserSelect = "none";
    render.canvas.style.userSelect = "none";
    render.canvas.style.touchAction = "none";

    const runner = Matter.Runner.create();

    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    return () => {
      Matter.Events.off(render, "afterRender");
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Mouse.clearSourceEvents(mouse);
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [imagesLoaded, sceneSize]);

  return (
    <div className="relative flex h-full min-h-45 w-full flex-col justify-between overflow-hidden p-4">
      <h2 className="pointer-events-none z-10 select-none text-sm font-medium uppercase text-neutral-700">
        Tech Stack
      </h2>

      <div
        ref={sceneRef}
        className="absolute inset-0 h-full w-full cursor-grab active:cursor-grabbing [&>canvas]:outline-none [&>canvas]:focus:outline-none"
      />
    </div>
  );
}