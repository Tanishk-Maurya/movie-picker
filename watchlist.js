const watchListContainer = document.getElementById("watch-list")
let array = JSON.parse(localStorage.getItem("watchlistArr")) 


async function renderWatchList(){
    if (array) {
        const html = await Promise.all(
            array.map(async movie => {
                const res = await fetch(`https://www.omdbapi.com/?apikey=da4de854&i=${movie}`)
                const data = await res.json()
                return `
                    <div class="movie-box" id='box-${data.imdbID}'>
                        <img src=${data.Poster} class="movie-poster">
                        <div class="infomovie">
                            <h1>${data.Title}</h1>
                            <div class="timemovie">
                                <p >${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <button class="remove-btn" data-movie=${data.imdbID}>- Remove</button>

                            </div>
                            <p class='textColor'>${data.Plot}</p>
                        </div>
                    </div><hr>
                `
            })
        )
        watchListContainer.innerHTML = html.join('')
        document.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', handleRemoveClick)})
    }
}


renderWatchList()

 function handleRemoveClick(e) {
    e.preventDefault()
    let movieId = e.target.dataset.movie
    const index = array.indexOf(movieId);
    if (index > -1) { 
    array.splice(index, 1)
    }
    renderWatchList()
}
