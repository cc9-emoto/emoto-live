import React from "react";
import playOnly from "../assets/images/playOnly.svg";
import "../styles/Playlist.scss";

const Playlist = ({ upcoming, previous, current }) => {
  const playlistItem = (song, index) => {
    return (
      <div className="playlist__item" key={song.name + index}>
        <div className="playlist__itemLeft">
          <img src={playOnly} alt="select cursor" />
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
        {previous.map((song, index) => playlistItem(song, index))}
        {current && playlistItem(current)}
        {upcoming.map((song, index) => playlistItem(song, index))}
      </div>
      <div className="playlist__bottom"></div>
    </div>
  );
};

export default Playlist;
