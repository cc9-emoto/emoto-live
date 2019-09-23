import axios from "axios";

const Spotify = {
  getAudioAnalysis: async ({ id, token }) => {
    if (id === undefined) return;
    console.log("getAudioAnalysis");
    try {
      const res = await axios.get(
        `https://api.spotify.com/v1/audio-analysis/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          timeout: 5000
        }
      );
      return res.data;
    } catch (err) {
      return Spotify.getAudioAnalysis({ id, token });
    }
  },
  createNewPlaylist: async ({ uid, token }) => {
    const res = await axios.post(
      `https://api.spotify.com/v1/users/${uid}/playlists`,
      {
        name: "Emoto Playlist"
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
  addToPlaylist: async ({ playlistId, songId, token }) => {
    const res = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris: [`spotify:track:${songId}`]
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
  startPlaying: async ({ token, deviceId, playlist }) => {
    const res = await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      {
        context_uri: `spotify:playlist:${playlist}`
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
  getPlaylistTracks: async ({ token, playlistId }) => {
    const res = await axios.get(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return res.data;
  },
  getTopTracks: async ({ token }) => {
    const tracks = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?limit=50`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const trackIds = tracks.data.items.map(song => song.id).join(",");
    const trackDataResponse = await axios.get(
      `https://api.spotify.com/v1/audio-features/?ids=${trackIds}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const trackData = trackDataResponse.data.audio_features;
    const topTrackData = tracks.data.items.map((song, index) => {
      const { valence, mode, energy, id } = trackData[index];
      return {
        name: song.name,
        artist: song.artists[0].name,
        id: song.id,
        emoValue: (valence + mode + energy) / 3
      };
    });
    return topTrackData;
  },
  startSecretTrack: async ({ token, deviceId }) => {
    const uris = [
      "spotify:track:3Y6XWs8xMlCngyIxNOFnsp",
      "spotify:track:0qeKzbUsW0V4ZWRJrHNiD3",
      "spotify:track:5AIbPmGJyxtXlabJHZtowQ"
    ];
    const res = await axios.put(
      `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
      { uris },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    return res.data;
  }
};

export default Spotify;
