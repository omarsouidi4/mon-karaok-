import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvqDFe7LdPEzse8pC8R9ZstrFVzO_0bZE",
  authDomain: "cantobar-7fba0.firebaseapp.com",
  projectId: "cantobar-7fba0",
  storageBucket: "cantobar-7fba0.appspot.com",
  messagingSenderId: "532252931763",
  appId: "1:532252931763:web:969157dc8d576f4c50e2c6",
  measurementId: "G-TP5LRMBZ8T"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const form = document.getElementById("song-form");
const artistInput = document.getElementById("artist");
const songInput = document.getElementById("song");
const tableInput = document.getElementById("table");

form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const artist = artistInput.value;
    const song = songInput.value;
    const table = tableInput.value;

    const request = {
        artist: artist,
        song: song,
        table: table,
        timestamp: Date.now(),
    };

    try {
        const docRef = await addDoc(collection(db, "songRequests"), request);
        console.log("Song request submitted with ID:", docRef.id);
    } catch (error) {
        console.error("Error submitting song request:", error);
    }

    form.reset();
});
