import React, { useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import "../styles/Player.scss"

const Player = ({ playerState, setPlayerState, player }) => {
  
  const requestNewToken = async () => {
    const refreshToken = Cookies.get("emoto-refresh");
    const response = await axios.post("http://localhost:4000/spotify/reauthorize", { refreshToken });
    Cookies.set("emoto-access", response.data);
    return response.data;
  };

  const waitForSpotify = () => {
    return new Promise(resolve => {
      if ('Spotify' in window) {
        resolve();
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => { resolve(); };
      }
    });
  }

  const startStatePolling = () => {
    setInterval(async () => {
      const state = await player.current.getCurrentState();
      setPlayerState(state);
    }, 100);
  }

  const playMusic = async (device_id) => {
    const token = Cookies.get('emoto-access')
    axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${device_id}`, {
      "context_uri": "spotify:playlist:4AsUaZhA0ibjTSvsLlJOoB"
    }, {headers: {Authorization: `Bearer ${token}` }});
  }

  const init = async() => {
    await waitForSpotify();
    const token = await requestNewToken();
    player.current = new window.Spotify.Player({
      name: 'EMOTO',
      getOAuthToken: cb => { cb(token); }
    });
    await player.current.connect();
    player.current.addListener('ready', ({ device_id }) => {
      playMusic(device_id);
    });
    startStatePolling();
  }
  useEffect(() => { init() }, [])

  if (playerState) {
    const { position, duration, paused } = playerState;
    const { album, artists, name } = playerState.track_window.current_track
    return (
      <div className="player">

        <div className="player__progressBar">
          <div className="player__progressBarComplete" style={{width: `${position/duration*100}%`}}/>
        </div>
        
        <div className="player__bottom">
          <div className="player__detail">
            <img src={album.images[0].url} />
            <div className="player__detailInfo">
              <h1>{ name }</h1>
              <h2>{ artists[0].name }</h2>
            </div>
          </div>
          <div className="player__controls">
            <button onClick={() => player.current.previousTrack()}>PREVIOUS</button>
            { paused ? <button onClick={() => player.current.resume()}>PLAY</button> : <button onClick={() => player.current.pause()}>PAUSE</button> }
            <button onClick={() => player.current.nextTrack()}>NEXT</button>
          </div>
        </div>

      </div>
    )
  } else {
    return <div />
  }
  
}

export default Player;