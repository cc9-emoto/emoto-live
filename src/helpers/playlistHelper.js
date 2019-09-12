import axios from 'axios';

const getNextSong = async ({ value, token, uid }) => {
  const response = await axios.post("/graphql", {
    query: `
    query {
      matchingSong (value: ${value}, token: "${token}", uid: "${uid}") {
        songId
      }
    }
  `
  });
 return response.data.data.matchingSong.songId;
}

export default { getNextSong }