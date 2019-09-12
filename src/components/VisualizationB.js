import React, { useEffect, useRef} from 'react';

const VisualizationB = ({ position }) => {
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

  const drawRectangle = (x, y, height) => {
    ctx.current.beginPath();
    ctx.current.rect(x, y, 5, height);
    ctx.current.fillStyle = 'white';
    ctx.current.fill();
  }

  const draw = () => {
    ctx.current.clearRect(0, 0, canvas.current.width, canvas.current.height);
    for (let i = 0; i < 100; i++) {
      drawRectangle(i*15, 0 , (Math.sin(i + position) + 2) * 200);
    }
  }


  return (
    <div className="visualization">
      <canvas id="canvas" height={window.innerHeight - 85} width={window.innerWidth}/>
    </div>
  )
}

export default VisualizationB;