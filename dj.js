// Sélectionner les boutons par leur ID
const clearAllButton = document.getElementById("clear-all");
const reduceListButton = document.getElementById("reduce-list");
const restoreDeletedButton = document.getElementById("restore-deleted");

// Fonction pour afficher les demandes de chansons sur la page
function displaySongRequests() {
    const songRequests = JSON.parse(localStorage.getItem('songRequests')) || [];
    const songList = document.getElementById('song-list');
    songList.innerHTML = '';

    songRequests.forEach(function (request) {
        const listItem = document.createElement('li');
        listItem.textContent = `${request.artist} - ${request.song} (Table ${request.table})`;
        songList.appendChild(listItem);
    });
}

// Ajouter un écouteur d'événement pour le bouton "Effacer tout"
clearAllButton.addEventListener("click", function () {
    clearAllSongs();
});

// Ajouter un écouteur d'événement pour le bouton "Réduire liste"
reduceListButton.addEventListener("click", function () {
    reduceSongList();
});

// Ajouter un écouteur d'événement pour le bouton "Récupérer chanson supprimée"
restoreDeletedButton.addEventListener("click", function () {
    restoreDeletedSong();
});

// Fonction pour récupérer une chanson supprimée
function restoreDeletedSong() {
    const deletedSongs = JSON.parse(localStorage.getItem("deletedSongs")) || [];
    if (deletedSongs.length === 0) {
        alert("Il n'y a pas de chansons supprimées à récupérer.");
        return;
    }

    const lastDeletedSong = deletedSongs.pop();
    localStorage.setItem("deletedSongs", JSON.stringify(deletedSongs));

    const existingRequests = JSON.parse(localStorage.getItem("songRequests")) || [];
    existingRequests.push(lastDeletedSong);
    localStorage.setItem("songRequests", JSON.stringify(existingRequests));

    displaySongRequests(); // Mettre à jour l'affichage des chansons
}

// Fonction pour supprimer les chansons et les stocker dans le tableau des chansons supprimées
function deleteSongs(songsToDelete) {
    const existingRequests = JSON.parse(localStorage.getItem("songRequests")) || [];
    const deletedSongs = JSON.parse(localStorage.getItem("deletedSongs")) || [];

    songsToDelete.forEach((song) => {
        const index = existingRequests.findIndex(
            (request) =>
                request.artist === song.artist &&
                request.song === song.song &&
                request.table === song.table
        );
        if (index !== -1) {
            deletedSongs.push(existingRequests.splice(index, 1)[0]);
        }
    });

    localStorage.setItem("songRequests", JSON.stringify(existingRequests));
    localStorage.setItem("deletedSongs", JSON.stringify(deletedSongs));
    displaySongRequests(); // Mettre à jour l'affichage des chansons
}

// Modifier les fonctions clearAllSongs et reduceSongList pour utiliser la fonction deleteSongs

function clearAllSongs() {
    deleteSongs(JSON.parse(localStorage.getItem("songRequests")) || []);
}

function reduceSongList() {
    const existingRequests = JSON.parse(localStorage.getItem("songRequests")) || [];
    const songsToDelete = existingRequests.slice(0, 5);
    deleteSongs(songsToDelete);
}

// Appeler la fonction pour afficher les demandes de chansons initiales
displaySongRequests();
    

    // Ajouter un écouteur d'événements 'storage' pour détecter les modifications du localStorage
    window.addEventListener('storage', function (event) {
        if (event.key === 'songRequests') {
            displaySongRequests();
            alert('Une nouvelle demande de chanson a été ajoutée.');
        }
    });

    // Fonction pour actualiser la liste des chansons toutes les 2 secondes
    function refreshSongList() {
        displaySongRequests();
        setTimeout(refreshSongList, 2000);
    }

    // Appeler la fonction pour commencer à actualiser la liste des chansons
    refreshSongList();
