import React, { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Spotify from "../helpers/Spotify";
import back from "../assets/images/back.svg";
import skip from "../assets/images/skip.svg";
import play from "../assets/images/play.svg";
import pause from "../assets/images/pause.svg";
import "../styles/Player.scss";

const Player = ({
  playerState,
  setPlayerState,
  player,
  playlist,
  getNextSong,
  offset,
  setOffset
}) => {
  const requestNewToken = async () => {
    const refreshToken = Cookies.get("emoto-refresh");
    const response = await axios.post(
      "https://xvdbttjww0.execute-api.us-east-2.amazonaws.com/done/reauthorize",
      { refreshToken },
      { headers: { "Content-type": "application/json" } }
    );
    const accessToken = response.data.body.access_token;
    Cookies.set("emoto-access", accessToken);
    return accessToken;
  };

  const waitForSpotify = () => {
    return new Promise(resolve => {
      if ("Spotify" in window) {
        resolve();
      } else {
        window.onSpotifyWebPlaybackSDKReady = () => {
          resolve();
        };
      }
    });
  };

  const startStatePolling = () => {
    setInterval(async () => {
      const state = await player.current.getCurrentState();
      setPlayerState(state);
    }, 100);
  };

  const playMusic = async ({ device_id, offset = 0 }) => {
    const token = Cookies.get("emoto-access");
    await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
      {
        context_uri: `spotify:playlist:${playlist}`,
        offset: { position: offset }
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  const init = async () => {
    await waitForSpotify();
    const token = await requestNewToken();
    player.current = new window.Spotify.Player({
      name: "EMOTO",
      getOAuthToken: cb => {
        cb(token);
      }
    });
    await player.current.connect();
    player.current.addListener("ready", ({ device_id }) => {
      playMusic({ device_id });
    });
    player.current.addListener("player_state_changed", async state => {
      if (state && state.position > state.duration - 300 && state.paused) {
        await getNextSong();
        setOffset((prevProps) => prevProps + 1);
        playMusic({ device_id: player.current._options.id, offset: offset + 1 });
      }
      if (state === null) playMusic({ device_id: player.current._options.id });
    });
    startStatePolling();
  };
  useEffect(() => {
    if (playlist) init();
  }, [playlist]);

  const handleProgressBarClick = async e => {
    const clickX = e.clientX;
    const windowX = window.innerWidth;
    const duration = playerState.duration;
    const seekTo = Math.round((duration * clickX) / windowX);
    player.current.seek(seekTo);
  };

  const nextTrack = async () => {
    setOffset((prevProps) => prevProps + 1);
    if (playerState.track_window.next_tracks.length === 0) {
      await getNextSong();
      playMusic({ device_id: player.current._options.id, offset: offset + 1 });
    }
    player.current.nextTrack()
  }

  if (playerState && playlist) {
    const { position, duration, paused } = playerState;
    const { album, artists, name } = playerState.track_window.current_track;
    return (
      <div className="player">
        <div
          className="player__progressBar"
          onClick={e => handleProgressBarClick(e)}
        >
          <div
            className="player__progressBarComplete"
            style={{ width: `${(position / duration) * 100}%` }}
          />
        </div>

        <div className="player__bottom">
          <div className="player__detail">
            <img src={album.images[0].url} />
            <div className="player__detailInfo">
              <h1>{name}</h1>
              <h2>{artists[0].name}</h2>
            </div>
          </div>
          <div className="player__controls">
            <button onClick={() => player.current.previousTrack()}>
              <img src={back} />
            </button>
            {paused ? (
              <button onClick={() => player.current.resume()}>
                <img src={play} />
              </button>
            ) : (
              <button onClick={() => player.current.pause()}>
                <img src={pause} />
              </button>
            )}
            <button onClick={() => nextTrack()}>
              <img src={skip} />
            </button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="player">
        <div className="player__progressBar"></div>
        <div className="player__bottom">
          <div className="player__controls">
            <img src={back} />
            <img src={play} />
            <img src={skip} />
          </div>
        </div>
      </div>
    );
  }
};

export default Player;
