const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require('./livechat-6b147-2355287f0fde.json');

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

module.exports = {
  db
}