'use strict';

console.log("Hey");

//function to get Songsterr Json Data
function getSongsterrJsonData() {
    let searchInput = $("#artist-song").val();
    fetch("http://www.songsterr.com/a/ra/songs.json?pattern="+searchInput)
    .then(response => response.json())
    .then(responseJson => displaySongsterrResults(responseJson))
    .catch(err => alert("WHOA! Something went wrong"));
}

//function to display the search results for Songsterr
function displaySongsterrResults(responseJson) {
    console.log(responseJson);
    $(".sheet-music").append(`<h1>Sheet Music</h1>`);
    for (let i=0; i<responseJson.length; i++) {
       $(".sheet-music").append(`<section class="sheet-music-results">
                                 <p>${responseJson[i].artist.name} - ${responseJson[i].title}</p>
                                 <p><a href="https://www.songsterr.com/a/wa/song?id=${responseJson[i].id}" target="_blank">View Sheet Music</a><p>
                                 </section>`)
    };
}

//function to get YouTube Json Data
function getYoutubeJsonData() {
    let searchInput = $("#artist-song").val();
    let properInput = searchInput.replace(" ", /%20/);
    let instrument = $("#instrument").val();
    const api = 'AIzaSyAmMXHH-BLKHd8RTPDFbBy0_bEYwzDxaFs';
    const baseURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=how%20to%20play%20' + properInput + '%20' + instrument + '&type=video&maxResults=5&key=' + api;
    fetch(baseURL)
    .then(response => response.json())
    .then(responseJson => displayYoutubeResults(responseJson))
    .catch(err => alert("YouTube went down"));
}

//function to display the search results for YouTube
function displayYoutubeResults(responseJson) {
    console.log(responseJson);
    $(".videos").append(`<h1>Videos</h1>`);
    for (let i=0; i<responseJson.items.length; i++) {
        $(".videos").append(`<section class="video-results">
                             <div class="video-thumbnail"><a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}" target="_blank"><img src="${responseJson.items[i].snippet.thumbnails.default.url}"></a></div>
                             <ul class="video-info">
                                 <li><a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}" target="_blank">${responseJson.items[i].snippet.title}</a></li>
                                 <li>${responseJson.items[i].snippet.channelTitle}</li>
                             </section>`)
    };
}

//function to make Search button functional
function searchButton() {
    $("form").submit(event => {
        event.preventDefault();
        $(".sheet-music").empty();
        $(".videos").empty();
        getSongsterrJsonData();
        getYoutubeJsonData();
    })
}

getSongsterrJsonData();
getYoutubeJsonData();
searchButton();