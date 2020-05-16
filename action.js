'use strict';

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
                                 <p><a href="https://www.songsterr.com/a/wa/song?id=${responseJson[i].id}" target="_blank" class="link">View Sheet Music</a><p>
                                 </section>`)
    };
}

//functiont to get Lyrics Data
function getLyricsJsonData() {
    let api = '1kZzSZsA-ao3MjtyQNdOxDwPxpnIKI7RnAzKzaWVNXo1w78iRZJXD59lEGWbg1gKGrb2XFMAdKLoxqjUAcygQA';
    let token = "hnDCED9RpM3J1twbO3B0J8NvgNuplgT2dwkUXOgD_6c-Cf40AHjkrPlvZwQLQhSD";
    let searchInput = $("#artist-song").val();
    let properInput = searchInput.replace(" ", /%20/);
    let baseURL = 'https://api.genius.com/search?q=' + properInput + '&access_token=' + token;
    
    fetch(baseURL)
        .then(response => response.json())
        .then(responseJson => displayLyrics(responseJson))
        .catch(error => alert("Whoa! Something went wrong! Please contact site administrator."));
}

//function to display Lyrics Results
function displayLyrics(responseJson) {
    console.log(responseJson);
    for (let i=0; i<responseJson.response.hits.length; i++) {
        $(".lyrics-container").append(`<section class="lyrics-results">
                                       <p>Artist: ${responseJson.response.hits[i].result.primary_artist.name}</br>
                                          Song: ${responseJson.response.hits[i].result.title}</p>
                                       <p><a href="${responseJson.response.hits[i].result.url}" target="_blank" class="link">View Lyrics</a></p>
                                       <p><img src="${responseJson.response.hits[i].result.header_image_thumbnail_url}" class="lyrics-image"></p>
                                       </section>`);
    }
}

//function to get YouTube Json Data
// function getYoutubeJsonData() {
//     let searchInput = $("#artist-song").val();
//     let properInput = searchInput.replace(" ", /%20/);
//     let instrument = $("#instrument").val();
//     const api = 'AIzaSyCDSarObwOZUGCY0KZavF_EX6rrlpB_kXA';
//     const baseURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&order=relevance&q=how%20to%20play%20' + properInput + '%20' + instrument + '&id.videoId&snippet.title&snippet.channelTitle&snippet.title&snippet.thumbnails.default.url&type=video&maxResults=2&key=' + api;
//     fetch(baseURL)
//     .then(response => response.json())
//     .then(responseJson => displayYoutubeResults(responseJson))
//     .catch(err => alert("Reached YouTube Quota Limit - Site Administrator is requesting increase. Please try again later."));
// }

//function to display the search results for YouTube
// function displayYoutubeResults(responseJson) {
//     console.log(responseJson);
//     for (let i=0; i<responseJson.items.length; i++) {
//         $(".videos-container").append(`<section class="video-results">
//                              <div class="video-thumbnail"><a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}" target="_blank"><img src="${responseJson.items[i].snippet.thumbnails.default.url}"></a></div>
//                              <ul class="video-info">
//                                  <li><a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}" target="_blank">${responseJson.items[i].snippet.title}</a></li>
//                                  <li>${responseJson.items[i].snippet.channelTitle}</li>
//                              </ul>
//                              </section>`)
//     };
// }

//function to make Search button functional
function searchButton() {
    $("form").submit(event => {
        event.preventDefault();
        let themes = ["main.css", "blue-theme.css", "red-theme.css", "green-theme.css"];
        let randomTheme = themes[Math.floor(Math.random() * themes.length)];
        $("#style").attr('href', randomTheme);
        $(".sheet-music-results-container").empty();
        $(".lyrics-container").empty();
        // $(".videos-container").empty();
        getSongsterrJsonData();
        getLyricsJsonData();
        // getYoutubeJsonData();
    })
}

getSongsterrJsonData();
getLyricsJsonData();
// getYoutubeJsonData();
searchButton();