import React, { useEffect, useRef } from 'react';
import "../styles/Visualization.scss"

const VisualizationA = ({ position }) => {
  const canvas = useRef();
  const ctx = useRef();

  useEffect(() => {
    canvas.current = document.getElementById("canvas");
    ctx.current = canvas.current.getContext('2d');
    draw();
  }, [])

  useEffect(() => {
    draw();
  }, [position])

  const drawCircle = (x, y, radius) => {
    ctx.current.beginPath();
    ctx.current.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.current.fillStyle = 'white';
    ctx.current.fill();
  }

  const draw = () => {
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        drawCircle(i*25 + Math.sin(position + i)*5, j*25 + Math.sin(position+j)*5, 3);
      }
    }
  }

  return (
    <div className="visualization">
      <canvas id="canvas" height={window.innerHeight - 85} width={window.innerWidth}/>
    </div>
  )
}

export default VisualizationA