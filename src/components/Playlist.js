import React from "react";
import playOnly from "../assets/images/playOnly.svg";
import Spotify from "../helpers/Spotify";
import "../styles/Playlist.scss";
import Cookies from "js-cookie";

const Playlist = ({
  upcoming,
  previous,
  current,
  offset,
  setOffset,
  player,
  playlist
}) => {
  const handleClick = (state, index) => {
    const device_id = player.current._options.id;
    const position = calculatePlaylistPosition(state, index);
    const token = Cookies.get("emoto-access");
    Spotify.playMusic({ device_id, offset: position, token, playlist });
    setOffset(position);
  };

  const calculatePlaylistPosition = (state, index) => {
    if (state === "current") return offset;
    if (state === "previous" && previous.length === 2)
      return offset + index - 2;
    if (state === "previous" && previous.length === 1) return offset - 1;
    if (state === "upcoming") return offset + index + 1;
  };

  const playlistItem = (song, index, state) => {
    return (
      <div className="playlist__item" key={song.name + index}>
        <div className="playlist__itemLeft">
          <img onClick={() => handleClick(state, index)} src={playOnly} />
        </div>
        <div className="playlist__itemRight">
          <h2>{song.name}</h2>
          <h3>{song.artists[0].name}</h3>
        </div>
      </div>
    );
  };

  return (
    <div className="playlist">
      <div className="playlist__top">
        <h1>PLAYLIST</h1>
        {previous.map((song, index) => playlistItem(song, index, "previous"))}
        {current && playlistItem(current, 0, "current")}
        {upcoming.map((song, index) => playlistItem(song, index, "upcoming"))}
      </div>
      <div className="playlist__bottom"></div>
    </div>
  );
};

export default Playlist;
