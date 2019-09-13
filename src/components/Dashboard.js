import React, { useState, useEffect, useRef } from 'react';
import Player from './Player'
import '../styles/Dashboard.scss'
import colorHelper from "../helpers/colorHelper"
import VisualizationToggle from '../components/VisualizationToggle'
import Playlist from '../components/Playlist'
import Speech from '../components/Speech'
import VisualizationA from "../components/VisualizationA"
import VisualizationB from "../components/VisualizationB"
import VisualizationC from "../components/VisualizationC"
import VisualizationD from "../components/VisualizationD"
import VisualizationE from "../components/VisualizationE"
import VisualizationF from "../components/VisualizationF"


import Camera from '../components/Camera';
import data from '../data.json'

const Dashboard = () => {
  const [playerState, setPlayerState] = useState();
  const [emotionValue, setEmotionValue] = useState(0.5);
  const [vis, setVis] = useState(1);
  const [color, setColor] = useState("FFFFFF");
  const player = useRef(null);

  useEffect(() => {
    setColor(`${colorHelper.getHexFromEmotion(emotionValue)}`)
  }, [emotionValue])

  return (
    <div className="dashboard">
      <div className = "dashboard__main">
        <VisualizationToggle vis={vis} setVis={setVis} />
        <div className="dashboard__emotionValue">{ emotionValue.toFixed(2) }</div>
        <Camera setEmotionValue={setEmotionValue} />
        <Speech player={player} />

        { vis === 1 ?
          <VisualizationA position={playerState ? playerState.position: 0} color={color} beatsData={data.beats} playerPlaying={true} />
        : vis === 2 ?
          <VisualizationB position={playerState ? playerState.position: 0} color={color} beatsData={data.beats} playerPlaying={true} />
        : vis === 3 ?
          <VisualizationC position={playerState ? playerState.position: 0} color={color} beatsData={data.beats} playerPlaying={true} />
        : vis === 4 ?
          <VisualizationD position={playerState ? playerState.position: 0} color={color} beatsData={data.beats} playerPlaying={true} />
        : vis === 5 ?
          <VisualizationE position={playerState ? playerState.position: 0} color={color} beatsData={data.beats} playerPlaying={true} />
        : 
          <VisualizationF position={playerState ? playerState.position: 0} color={color} beatsData={data.beats} playerPlaying={true} />
        }

      </div>
      <Playlist 
        upcoming={playerState ? playerState.track_window.next_tracks : []} 
        previous={playerState ? playerState.track_window.previous_tracks : []}
        current={playerState ? playerState.track_window.current_track : null }
      />
      <Player playerState={playerState} setPlayerState={setPlayerState} player={player} />
    </div>
  )
}

export default Dashboard;