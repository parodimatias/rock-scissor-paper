var admin = require("firebase-admin");

var serviceAccount = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mp-rock-scissor-paper-default-rtdb.firebaseio.com/",
});
export const firestore = admin.firestore();
export const rtdb = admin.database();
