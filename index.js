const inputSearch = document.getElementById("input-search")
const searchBtn = document.getElementById("search-btn")
const movieList = document.getElementById("movie-list")

let watchlistArr = []
searchBtn.addEventListener('click',handleSearch)

async function handleSearch(){
    if(inputSearch){
      const res = await fetch(`https://www.omdbapi.com/?apikey=da4de854&s=${inputSearch.value}`)
      const data = await res.json()
          if(data.Search !==undefined &&  data.Response !== 'False'){
            const completeData = await Promise.all(  
              data.Search.map(async data=>{
                const response  = await fetch(`https://www.omdbapi.com/?apikey=da4de854&i=${data.imdbID}`)
                const info = await response .json()
                return info
              })
            )
        renderList(completeData)
        }    
    }
}

function renderList(arr){
    let html =''
    movieList.innerHTML = ''
    arr.forEach(element => {
    const itemId = element.imdbID 
    
    html +=`
    <div class="movie-box" id='box-${itemId}'>
        <img src=${element.Poster} class="movie-poster">
        <div class="infomovie">
            <h1>${element.Title}</h1>
            <div class="timemovie">
                <p >${element.Runtime}</p>
                <p>${element.Genre}</p>
                <button class="add-btn" data-movie=${itemId}>+ Watchlist</button>
            </div>
            <p class='textColor'>${element.Plot}</p>
        </div>
    </div><hr>`  
    
    })
    movieList.innerHTML = html
    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', handleAddClickWAtchlist)
    })
}


async function handleAddClickWAtchlist(e){
    e.preventDefault()
    let movieId = e.target.dataset.movie
    if(movieId){
        const res = await fetch(`https://www.omdbapi.com/?apikey=da4de854&i=${movieId}`)
        const data = await res.json()
        const selectedMovie = data.imdbID
        if(selectedMovie){
            watchlistArr.unshift(selectedMovie)
            localStorage.setItem("watchlistArr", JSON.stringify(watchlistArr))
        }      
    }
}



