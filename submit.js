const form = document.getElementById("song-form");
const artistInput = document.getElementById("artist");
const songInput = document.getElementById("song");
const tableInput = document.getElementById("table");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    const artist = artistInput.value;
    const song = songInput.value;
    const table = tableInput.value;

    const request = {
        artist: artist,
        song: song,
        table: table,
        timestamp: new Date(),
    };

    storeSongRequest(request);
    form.reset();
});

function storeSongRequest(request) {
    const existingRequests = JSON.parse(localStorage.getItem("songRequests")) || [];
    existingRequests.push(request);
    localStorage.setItem("songRequests", JSON.stringify(existingRequests));
}
