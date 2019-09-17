import Dexie from 'dexie';

const db = new Dexie('emotoDb');
db.version(1).stores({
  songs: 'id, name, artist, emoValue'
});

export default db;