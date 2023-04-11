import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, query, orderBy, onSnapshot } from "firebase/firestore";

const firebaseConfig = {
  // Utilisez ici la même configuration que celle utilisée dans submit.js
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const clearAllButton = document.getElementById("clear-all");
const reduceListButton = document.getElementById("reduce-list");
const restoreDeletedButton = document.getElementById("restore-deleted");

function displaySongRequests(songRequests) {
  const songList = document.getElementById("song-list");
  songList.innerHTML = "";

  songRequests.forEach(function (request) {
    const listItem = document.createElement("li");
    listItem.textContent = `${request.artist} - ${request.song} (Table ${request.table})`;
    songList.appendChild(listItem);
  });
}

function fetchSongRequests() {
  const songRequestsQuery = query(collection(db, "songRequests"), orderBy("timestamp", "desc"));
  onSnapshot(songRequestsQuery, (snapshot) => {
    const songRequests = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });
    displaySongRequests(songRequests);
  });
}

clearAllButton.addEventListener("click", function () {
  // Fonction pour effacer toutes les demandes de chansons
});

reduceListButton.addEventListener("click", function () {
  // Fonction pour réduire la liste des demandes de chansons
});

restoreDeletedButton.addEventListener("click", function () {
  // Fonction pour restaurer les chansons supprimées
});

fetchSongRequests();
