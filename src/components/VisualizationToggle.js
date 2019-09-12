import React from 'react';
import '../styles/VisualizationToggle.scss'

const VisualizationToggle = ({ vis, setVis }) => {
  return (
    <div className="visualizationToggle">
      <button className="visualizationToggle__button" aria-selected={vis===1} onClick={()=>setVis(1)}>1</button>
      <button className="visualizationToggle__button" aria-selected={vis===2} onClick={()=>setVis(2)}>2</button>
      <button className="visualizationToggle__button" aria-selected={vis===3} onClick={()=>setVis(3)}>3</button>
    </div>
  )
}

export default VisualizationToggle;