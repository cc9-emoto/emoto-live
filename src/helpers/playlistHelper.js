const playlistHelper = {
  getNextSong: ({ emoValue, songs }) => {
    const sortedSongs = songs.sort((songA, songB) => {
      const diffA = Math.abs(songA.emoValue - emoValue);
      const diffB = Math.abs(songB.emoValue - emoValue);
      if (diffA > diffB) return 1;
      return -1;
    });
    console.log(sortedSongs);
    return sortedSongs[0];
  }
};

export default playlistHelper;
