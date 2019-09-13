import React  from 'react';
import "../styles/Playlist.scss"

const Playlist = ({ upcoming, previous, current }) => {
  const playlistItem = (song) => {
    return (
      <div className="playlist__item" key={song.name}>
        <h1>{ song.name }</h1>
        <h1>{ song.artists[0].name }</h1>
      </div>
    )
  }

  return (
    <div className="playlist">
      <div className="playlist__top">
        {previous.map((song) => playlistItem(song))}
        { current && playlistItem(current) }
        {upcoming.map((song) => playlistItem(song))}
      </div>
      <div className="playlist__bottom">
      </div>
    </div>
  )
}

export default Playlist;