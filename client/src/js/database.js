import { openDB } from 'idb';

// Initialize the database
const initdb = async () => {
  const db = await openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
  return db;
};



// TODO: Implement logic for putDb method to accept content and add it to the database
 export const putDb = async (content) => {
   const db = await initdb();
   const transaction = db.transaction('jate', 'readwrite');
   const store = transaction.objectStore('jate');
   await store.add(content);
   console.log('Content added to the database');
 };

// TODO: Implement logic for getDb method to retrieve all content from the database
 export const getDb = async () => {
   const db = await initdb();
   const store = db.transaction('jate').objectStore('jate');
   const content = await store.getAll();
   return content;
 };

initdb();