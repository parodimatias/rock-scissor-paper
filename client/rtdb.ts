import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Set the configuration for your app
// TODO: Replace with your project's config object
const firebaseConfig = {
  apiKey: "AIzaSyA2uDNTt-FN1lmvgy5JTHxEQrc2dXqcjrc",
  authDomain: "mp-rock-scissor-paper.firebaseapp.com",
  databaseURL: "https://mp-rock-scissor-paper-default-rtdb.firebaseio.com/",
  storageBucket: "bucket.appspot.com",
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
export const rtdb = getDatabase(app);
