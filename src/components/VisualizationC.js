/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import anime from "animejs";
import "../styles/Visualization.scss";

const VisualizationC = ({ position, beatsData = [], playerPlaying, color }) => {
  const [duration, setDuration] = useState(200);
  const beats = new Set(beatsData.map(beat => Math.ceil((beat.start * 1000) / 100) * 100));

  useEffect(() => {
    if (beatsData.length > 0 && playerPlaying) {
      const avgDuration =
        beatsData.reduce((acc, beat) => acc + beat.duration, 0) /
        beatsData.length;
      setDuration(avgDuration * 1000);
    }
  }, [beatsData, playerPlaying]);

  useEffect(() => {
    if (beats.has(Math.round(position/100)*100)) animate();
  }, [position])
  
  const animate = () => {
    anime({
      targets: ".circle",
      scale: [
        { value: 0.95, easing: "easeInOutQuad", duration: Math.round(duration / 2) },
        { value: 1, easing: "easeInOutQuad", duration: Math.round(duration / 2) }
      ],
      delay: anime.stagger(2, { grid: [25, 30], from: "center" })
    });
  };

  const renderCircles = () => {
    const array = [];
    for (let x = 0; x <= 120; x = x + 4) {
      for (let y = 0; y <= 100; y = y + 4) {
        array.push(<circle key={`${x},${y}`}className="circle" cx={x} cy={y} r="0.5" fill={`#${color}`} />);
      }
    }
    return array;
  };

  return (
    <div className="visualization">
      <svg viewBox="0 0 100 60">{renderCircles()}</svg>
    </div>
  );
};

export default VisualizationC;
