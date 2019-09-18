import React, { useState, useEffect, useRef } from "react";
import Player from "./Player";
import Cookies from "js-cookie";

import "../styles/Dashboard.scss";
import colorHelper from "../helpers/colorHelper";
import VisualizationToggle from "../components/VisualizationToggle";
import Playlist from "../components/Playlist";
import Speech from "../components/Speech";
import db from "../db/db.js";
import VisualizationA from "../components/VisualizationA";
import VisualizationB from "../components/VisualizationB";
import VisualizationC from "../components/VisualizationC";
import VisualizationD from "../components/VisualizationD";
import VisualizationE from "../components/VisualizationE";
import VisualizationF from "../components/VisualizationF";
import playlistHelper from "../helpers/playlistHelper";

import Spotify from "../helpers/Spotify";
import Camera from "../components/Camera";

const Dashboard = () => {
  const [playerState, setPlayerState] = useState();
  const [emotionValue, setEmotionValue] = useState(0.5);
  const [vis, setVis] = useState(1);
  const [songs, setSongs] = useState();
  const [playlist, setPlaylist] = useState(null);
  const [data, setData] = useState(null);
  const [color, setColor] = useState("FFFFFF");
  const player = useRef(null);
  const [voiceLang, setVoiceLang] = useState("en-US");

  useEffect(() => {
    setColor(`${colorHelper.getHexFromEmotion(emotionValue)}`);
  }, [emotionValue]);

  useEffect(() => {
    initPlaylist();
    getTopSongs();
  }, []);

  useEffect(() => {
    if (playlist) getSongData();
  }, [playlist]);

  const getSongData = async () => {
    console.log("get SongData");
    const token = Cookies.get("emoto-access");
    const res = await Spotify.getPlaylistTracks({
      token,
      playlistId: playlist
    });
    const tracks = res.items.map(item => item.track.id);
    const newData = await Spotify.getAudioAnalysis({ id: tracks[0], token });
    if (newData) setData(data ? [...data, newData] : [newData]);
  };

  const initPlaylist = async () => {
    const playlist = Cookies.get("emoto-playlist");
    if (playlist) {
      setPlaylist(playlist);
    } else {
      const token = Cookies.get("emoto-access");
      const uid = Cookies.get("emoto-id");
      const data = await Spotify.createNewPlaylist({ uid, token });
      Cookies.set("emoto-playlist", data.id);
      setPlaylist(data.id);
    }
  };

  const getNextSong = async () => {
    const songs = await db.songs.filter(song => !song.played).toArray();
    const newSong = playlistHelper.getNextSong({ emoValue: 0.8, songs });
    console.log("GET NEXT SONG");
    db.songs.update(newSong.id, { played: true });
    const token = Cookies.get("emoto-access");
    const data = await Spotify.addToPlaylist({
      songId: newSong.id,
      playlistId: playlist,
      token
    });
  };

  const getTopSongs = async () => {
    const count = await db.songs.count();
    if (count > 0) {
      const data = await db.songs.toArray();
      setSongs(data);
    } else {
      const token = Cookies.get("emoto-access");
      const data = await Spotify.getTopTracks({ token });
      const dataWithPlayed = data.map(song => ({ ...song, played: false }));
      const res = await db.songs.bulkAdd(dataWithPlayed);
      setSongs(data);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard__main">
        <VisualizationToggle vis={vis} setVis={setVis} />
        <div className="dashboard__emotionValue">{emotionValue.toFixed(2)}</div>
        <Camera setEmotionValue={setEmotionValue} />
        <Speech
          player={player}
          voiceLang={voiceLang}
          setVoiceLang={setVoiceLang}
        />

        {vis === 1 ? (
          <VisualizationA
            position={playerState ? playerState.position : 0}
            color={color}
            beatsData={data ? data[0].beats : []}
            playerPlaying={true}
          />
        ) : vis === 2 ? (
          <VisualizationB
            position={playerState ? playerState.position : 0}
            color={color}
            beatsData={data ? data[0].beats : []}
            playerPlaying={true}
          />
        ) : vis === 3 ? (
          <VisualizationC
            position={playerState ? playerState.position : 0}
            color={color}
            beatsData={data ? data[0].beats : []}
            playerPlaying={true}
          />
        ) : vis === 4 ? (
          <VisualizationD
            position={playerState ? playerState.position : 0}
            color={color}
            beatsData={data ? data[0].beats : []}
            playerPlaying={true}
          />
        ) : vis === 5 ? (
          <VisualizationE
            position={playerState ? playerState.position : 0}
            color={color}
            beatsData={data ? data[0].beats : []}
            playerPlaying={true}
          />
        ) : (
          <VisualizationF
            position={playerState ? playerState.position : 0}
            color={color}
            beatsData={data ? data[0].beats : []}
            playerPlaying={true}
          />
        )}
      </div>
      <Playlist
        upcoming={playerState ? playerState.track_window.next_tracks : []}
        previous={playerState ? playerState.track_window.previous_tracks : []}
        current={playerState ? playerState.track_window.current_track : null}
      />
      <Player
        getNextSong={getNextSong}
        playerState={playerState}
        setPlayerState={setPlayerState}
        player={player}
        playlist={playlist}
        getSongData={getSongData}
      />
    </div>
  );
};

export default Dashboard;
