import React, { useState, useEffect, useRef } from "react";
import "../styles/Visualization.scss";

const VisualizationD = ({ position, beatsData = [], color, playerPlaying }) => {
  const canvas = useRef();
  const ctx = useRef();
  const container = useRef();
  const counter = useRef(0);
  const [duration, setDuration] = useState(200);
  const beats = new Set(
    beatsData.map(beat => Math.ceil((beat.start * 1000) / 100) * 100)
  );

  useEffect(() => {
    const container = document.querySelector(".visualization");
    canvas.current = document.getElementById("canvas");
    canvas.current.setAttribute("width", container.scrollWidth);
    canvas.current.setAttribute("height", container.scrollHeight);
    ctx.current = canvas.current.getContext("2d");
    ctx.current.translate(canvas.current.width / 2, canvas.current.height / 2);
    draw();
  }, []);

  useEffect(() => {
    if (beats.has(Math.round(position / 100) * 100)) animate();
  }, [position]);

  useEffect(() => {
    if (beatsData.length > 0 && playerPlaying) {
      const avgDuration =
        beatsData.reduce((acc, beat) => acc + beat.duration, 0) /
        beatsData.length;
      setDuration(avgDuration * 1000);
    }
  }, [beatsData, playerPlaying]);

  const drawRectangle = (x, y, height, i) => {
    ctx.current.beginPath();
    ctx.current.rotate(Math.PI / i);
    ctx.current.rect(x, y, 5, height);
    ctx.current.fillStyle = `#${color}`;
    ctx.current.fill();
  };

  const animate = () => {
    const timestamp = Date.now();
    const recurse = () => {
      if (Date.now() - timestamp > duration) {
        return;
      } else {
        draw();
        requestAnimationFrame(recurse);
      }
    };
    recurse();
  };

  const draw = () => {
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    for (let i = 0; i < 100; i++) {
      drawRectangle(
        0,
        0,
        (Math.sin(counter.current / 30) + 1) * 200 * Math.random(),
        i
      );
    }
    counter.current = counter.current + 1;
  };

  return (
    <div className="visualization" ref={container}>
      <canvas id="canvas" />
    </div>
  );
};

export default VisualizationD;
