import React, { useEffect, useState } from 'react';
import anime from 'animejs';
import "../styles/Visualization.scss";

const VisualizationE = ({ beatsData = [], playerPlaying, color, emotionValue }) => {
  let time = 0;
  let counter = 0;
  const beats = new Set(beatsData.map((beat) => Math.ceil(beat.start*1000/100)*100));

  const animate = () => {
    anime({
      targets: '.rectangle',
      height: function(e, i, l) {
        return (Math.sin(i + counter) + 1.5) * 25
      }
    });
    counter++;
  }

  useEffect(() => {
    time = 0;
    if (beatsData.length > 0 && time === 0 && playerPlaying) {
      startTicker();
    }
  }, [beatsData]);

  const startTicker = () => {
    setInterval(() => {
      time = time + 100
      if (beats.has(time)) { 
        animate();
      }
    }, 100);
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