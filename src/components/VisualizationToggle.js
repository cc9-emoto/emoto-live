import React from 'react';
import '../styles/VisualizationToggle.scss'

const VisualizationToggle = ({ vis, setVis }) => {
  return (
    <div className="visualizationToggle">
      <button className="visualizationToggle__button" aria-selected={vis===1} onClick={()=>setVis(1)}>1</button>
      <button className="visualizationToggle__button" aria-selected={vis===2} onClick={()=>setVis(2)}>2</button>
      <button className="visualizationToggle__button" aria-selected={vis===3} onClick={()=>setVis(3)}>3</button>
      <button className="visualizationToggle__button" aria-selected={vis===4} onClick={()=>setVis(4)}>4</button>
      <button className="visualizationToggle__button" aria-selected={vis===5} onClick={()=>setVis(5)}>5</button>
      <button className="visualizationToggle__button" aria-selected={vis===6} onClick={()=>setVis(6)}>6</button>

    </div>
  )
}

export default VisualizationToggle;