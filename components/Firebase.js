import Firebase from 'firebase';

const fire = Firebase.initializeApp({
  apiKey: "AIzaSyBUbWbY5wpfQrczSdKgnFUdktO3bpz0_kE",
  authDomain: "receipt-6dbc4.firebaseapp.com",
  databaseURL: "https://receipt-6dbc4-default-rtdb.firebaseio.com",
  projectId: "receipt-6dbc4",
  storageBucket: "receipt-6dbc4.appspot.com",
  messagingSenderId: "214644391286",
  appId: "1:214644391286:web:424a12c9dd8565820f8e57"
});

export const database = fire.database();
