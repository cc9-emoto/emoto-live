import React, { useState } from 'react';
import Player from './Player'
import '../styles/Dashboard.scss'
import VisualizationToggle from '../components/VisualizationToggle'
import Playlist from '../components/Playlist'
import VisualizationB from "../components/VisualizationB"
import Camera from '../components/Camera';

const Dashboard = () => {
  const [playerState, setPlayerState] = useState();
  const [emotionValue, setEmotionValue] = useState(0.5);
  const [vis, setVis] = useState(2);

  return (
    <div className="dashboard">
      <div className = "dashboard__main">
        <VisualizationToggle vis={vis} setVis={setVis} />
        <div className="dashboard__emotionValue">{ emotionValue.toFixed(2) }</div>
        <Camera setEmotionValue={setEmotionValue} />
        {/* <VisualizationB position={playerState ? playerState.position: 0}/> */}
      </div>
      <Playlist playerState={playerState}/>
      <Player playerState={playerState} setPlayerState={setPlayerState} />
    </div>
  )
}

export default Dashboard;