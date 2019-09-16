import React, { useEffect, useState, useRef } from 'react';
import anime from 'animejs';
import "../styles/Visualization.scss";

const VisualizationE = ({ beatsData = [], color, playerPlaying, position, emotionValue }) => {
  const counter = useRef(0);  
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
      targets: '.rectangle',
      height: function(e, i, l) {
        return (Math.sin(i + counter.current) + 1.5) * 25
      }
    });
    counter.current = counter.current + 1;
  }

  const renderRectangles = () => {
    const array = [];
    for (let i = 0; i < 100; i++ ) {
      array.push(<rect key={i} className="rectangle" x={i} height={(Math.sin(i) + 1.5) * 25} width={0.5} fill={`#${color}`} />);
    }
    return array;
  }

  return (
    <div className="visualization">
      <svg className="vis3" viewBox="0 0 100 60">
        { renderRectangles() }
      </svg>
    </div>
  )
}

export default VisualizationE;