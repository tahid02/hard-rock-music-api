
// Search Song
// api link: https://api.lyrics.ovh/suggest/:searchText

// example: https://api.lyrics.ovh/suggest/hello

// Lyric
// lyric link: https://api.lyrics.ovh/v1/:artist/:title

// example: https://api.lyrics.ovh/v1/Adele/Hello


const searchSongs = () =>{
    const searchField = document.getElementById('search-field');
    // console.log(searchField.value);
    const searchText = searchField.value;

    fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data.data);
        displayMusic(data.data);
    })
    .catch(err => alert('search valid name') )
}

const displayMusic = songs =>{
    songs.forEach(song => {
        // console.log(song.preview,song.album.title,song.artist.name,song.title);
        const songContainer = document.getElementById('song-container');
        songContainer.innerHTML = `
                <h3> ${song.album.title}</h3>
                <h5> ${song.artist.name}</h5>
                <audio src="${song.preview}" loop  controls></audio>  
                <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success ">Lyric</button>
                `;
    });
}
// ${song.artist.name},${song.title}
const getLyric = (artist,title) =>{
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('song-lyrics').innerHTML = `<pre class="text-light"> ${data.lyrics} </pre>`; 
        console.log(data.lyrics);
    })
    .catch(err => alert(' no lyric found ,only music'))
    console.log('i am clicked',artist,title);
}
