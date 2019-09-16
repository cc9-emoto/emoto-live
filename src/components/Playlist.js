import React  from 'react';
import playOnly from '../assets/images/playOnly.svg'
import "../styles/Playlist.scss"

const Playlist = ({ upcoming, previous, current }) => {
  const playlistItem = (song) => {
    return (
      <div className="playlist__item" key={song.name}>
        <div className="playlist__itemLeft">
        <img src={playOnly} />
        </div>
        <div className="playlist__itemRight">
          <h2>{ song.name }</h2>
          <h3>{ song.artists[0].name }</h3>
        </div>
      </div>
    )
  }

  return (
    <div className="playlist">
      <div className="playlist__top">
        <h1>PLAYLIST</h1>
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