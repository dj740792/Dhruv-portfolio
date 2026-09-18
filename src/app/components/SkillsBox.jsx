"use client";

import { useEffect, useRef, useState } from "react";
import Matter from "matter-js";
import { TECH_STACK } from "@/constants/index";

export default function SkillsBox() {
  const sceneRef = useRef(null);
  const imageElementsRef = useRef(new Map());
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // 1. Preload image elements into memory
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = TECH_STACK.length;
    imageElementsRef.current.clear();

    TECH_STACK.forEach((item) => {
      const img = new window.Image();
      img.src = item.icon;
      img.onload = () => {
        imageElementsRef.current.set(item.icon, img);
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        console.error(`Failed to load image at path: ${item.icon}`);
        loadedCount++;
        if (loadedCount === totalImages) {
          setImagesLoaded(true);
        }
      };
    });
  }, []);

  // 2. Initialize Physics Engine with Custom Circular Renderer
  useEffect(() => {
    if (!imagesLoaded) return;

    const container = sceneRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const engine = Matter.Engine.create();
    engine.world.gravity.y = 1.2;

    const render = Matter.Render.create({
      element: container,
      engine: engine,
      options: {
        width,
        height,
        background: "transparent",
        wireframes: false,
        showAngleIndicator: false,
      },
    });

    const wallThickness = 40;
    const wallOptions = { isStatic: true, render: { visible: false } };

    const ground = Matter.Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width,
      wallThickness,
      wallOptions,
    );
    const leftWall = Matter.Bodies.rectangle(
      -wallThickness / 2,
      height / 2,
      wallThickness,
      height * 2,
      wallOptions,
    );
    const rightWall = Matter.Bodies.rectangle(
      width + wallThickness / 2,
      height / 1,
      wallThickness,
      height * 2,
      wallOptions,
    );

    const loadedItems = TECH_STACK.filter((item) =>
      imageElementsRef.current.has(item.icon),
    );

    // Create circle bodies WITHOUT sprite textures attached to avoid Matter's default square rendering
    const balls = loadedItems.map((item, index) => {
      const radius = item.radius || 22;
      const startX = 30 + (index * (width - 60)) / loadedItems.length;
      const startY = -30 - index * 30;

      const body = Matter.Bodies.circle(startX, startY, radius, {
        restitution: 0.5,
        friction: 0.3,
        density: 0.04,
        render: {
          visible: false, // We render manually in the loop below
        },
      });

      // Attach icon reference to body for custom drawing
      body.iconPath = item.icon;
      return body;
    });

    Matter.Composite.add(engine.world, [ground, leftWall, rightWall, ...balls]);

    // Custom Canvas Render Loop for Perfect Circles
    Matter.Events.on(render, "afterRender", () => {
      const context = render.context;

      balls.forEach((body) => {
        const { position, angle, circleRadius } = body;
        const img = imageElementsRef.current.get(body.iconPath);

        if (!img || !circleRadius) return;

        context.save();
        context.translate(position.x, position.y);
        context.rotate(angle);

        // Clip strictly into a circle
        context.beginPath();
        context.arc(0, 0, circleRadius, 0, 2 * Math.PI);
        context.closePath();
        context.clip();

        // Draw image filled inside circular clip
        context.drawImage(
          img,
          -circleRadius,
          -circleRadius,
          circleRadius * 2,
          circleRadius * 2,
        );

        context.restore();
      });
    });

    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse: mouse,
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

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    return () => {
      Matter.Render.stop(render);
      Matter.Runner.stop(runner);
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [imagesLoaded]);

  return (
    <div className=" relative w-full h-full min-h-45  overflow-hidden p-4 flex flex-col justify-between">
      <h2 className="text-sm font-medium text-neutral-600 z-10 pointer-events-none select-none">
        Tech Stack
      </h2>

     <div
        ref={sceneRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing [&>canvas]:outline-none [&>canvas]:focus:outline-none"
      />
    </div>
  );
}
