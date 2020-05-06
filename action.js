'use strict';

console.log("Hey");

//function to get Songsterr Json Data
function getSongsterrJsonData() {
    let searchInput = $("#artist-song").val();
    fetch("https://www.songsterr.com/a/ra/songs.json?pattern="+searchInput)
    .then(response => response.json())
    .then(responseJson => displaySongsterrResults(responseJson))
    .catch(err => alert("WHOA! Something went wrong"));
}

//function to display the search results for Songsterr
function displaySongsterrResults(responseJson) {
    console.log(responseJson);
    for (let i=0; i<responseJson.length; i++) {
       $(".sheet-music-results-container").append(`<section class="sheet-music-results">
                                 <p>Artist: ${responseJson[i].artist.name}<br>
                                    Song: ${responseJson[i].title}</p>
                                 <p><a href="https://www.songsterr.com/a/wa/song?id=${responseJson[i].id}" target="_blank" class="music-link">View Sheet Music</a><p>
                                 </section>`)
    };
}

//function to get YouTube Json Data
function getYoutubeJsonData() {
    let searchInput = $("#artist-song").val();
    let properInput = searchInput.replace(" ", /%20/);
    let instrument = $("#instrument").val();
    const api = 'AIzaSyCwmIHLLbhnmo7oEWksps3ew8DmKr5rHfw';
    const baseURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=how%20to%20play%20' + properInput + '%20' + instrument + '&type=video&maxResults=5&key=' + api;
    fetch(baseURL)
    .then(response => response.json())
    .then(responseJson => displayYoutubeResults(responseJson))
    .catch(err => alert("YouTube went down"));
}

//function to display the search results for YouTube
function displayYoutubeResults(responseJson) {
    console.log(responseJson);
    for (let i=0; i<responseJson.items.length; i++) {
        $(".videos-container").append(`<section class="video-results">
                             <div class="video-thumbnail"><a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}" target="_blank"><img src="${responseJson.items[i].snippet.thumbnails.default.url}"></a></div>
                             <ul class="video-info">
                                 <li><a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}" target="_blank">${responseJson.items[i].snippet.title}</a></li>
                                 <li>${responseJson.items[i].snippet.channelTitle}</li>
                             </ul>
                             </section>`)
    };
}

//function to make Search button functional
function searchButton() {
    $("form").submit(event => {
        event.preventDefault();
        $("link[href='main.css']").attr('href', 'blue-theme.css');
        $(".sheet-music-results-container").empty();
        $(".videos-container").empty();
        getSongsterrJsonData();
        getYoutubeJsonData();
    })
}

getSongsterrJsonData();
getYoutubeJsonData();
searchButton();