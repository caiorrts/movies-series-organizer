const apiKey = "891cdfe72emsh1a6b85fed9ae922p17427djsn197a92163c53"
const apiHost = "ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com"

const resList = document.getElementById("res-list")
const btnSearch = document.getElementById("btn-search")
const textSearch = document.getElementById("text-search")
const yearStart = document.getElementById("year-start")
const yearEnd = document.getElementById("year-end")
const genre = document.getElementById("genre")
const ckMovie = document.getElementById("ck-movie")
const ckShow = document.getElementById("ck-show")
const resSort = document.getElementById("sort")
const btnReset = document.getElementById("btn-reset")
const titleGenre = document.getElementById("title-genre")
const minRating = document.getElementById("min-rating")
const labRating = document.getElementById("lab-rating")
const movieList = document.getElementById("movie-list")
const year = new Date().getFullYear()

let apiResult = []

btnSearch.addEventListener("click", () => getMovie(textSearch.value))
ckMovie.addEventListener("click", () => changeGenre())
ckShow.addEventListener("click", () => changeGenre())
yearStart.addEventListener("change", () => changeYear())
yearEnd.addEventListener("change", () => changeYear())
btnReset.addEventListener("click", () => resetYear())
minRating.addEventListener("mousemove", () => changeRating())
minRating.addEventListener("change", () => changeRating())
//movieList.addEventListener("click", () => getDetails())


// FILLS THE INPUT YEAR RANGE
function resetYear() {
    titleGenre.innerHTML = "Movie Genre:"
    labRating.innerHTML = "0.0"
    yearStart.innerHTML = ""
    yearEnd.innerHTML = ""
    for (i = 1900; i <= year ; i++) {
        yearStart.innerHTML += `<option value="${i}">${i}</option>`
    }
    for (i = year; i >= 1900 ; i--) {
        yearEnd.innerHTML += `<option value="${i}">${i}</option>`
    }
}
resetYear() // Fill year range for the first time


// FILLS THE INPUT GENRES
function changeGenre() {
    if (ckMovie.checked) {
        titleGenre.innerHTML = "Movie Genre:"
        genre.innerHTML = `
                        <option value="">All</option>
                        <option value="Action-Adventure">Action-Adventure</option>
                        <option value="Animation">Animation</option>
                        <option value="Anime">Anime</option>
                        <option value="Biography">Biography</option>
                        <option value="Children's">Children's</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Crime">Crime</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Drama">Drama</option>
                        <option value="Family">Family</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Health/ Workout">Health/ Workout</option>
                        <option value="History">History</option>
                        <option value="Horror">Horror</option>
                        <option value="Musical">Musical</option>
                        <option value="Mystery-Suspense">Mystery-Suspense</option>
                        <option value="Non-Fiction">Non-Fiction</option>
                        <option value="Romance">Romance</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Thriller">Thriller</option>
                        <option value="TV Movie">TV Movie</option>
                        <option value="War">War</option>
                        <option value="Western">Western</option>`
    } else {
        titleGenre.innerHTML = "TV Show Genre:"
        genre.innerHTML = `
                        <option value="">All</option>
                        <option value="Action">Action</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Animation">Animation</option>
                        <option value="Biography">Biography</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Crime">Crime</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Drama">Drama</option>
                        <option value="Family">Family</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Film-Noir">Film-Noir</option>
                        <option value="Game Show">Game Show</option>
                        <option value="History">History</option>
                        <option value="Horror">Horror</option>
                        <option value="Lifestyle">Lifestyle</option>
                        <option value="Music">Music</option>
                        <option value="Musical">Musical</option>
                        <option value="Mystery">Mystery</option>
                        <option value="News">News</option>
                        <option value="Politics">Politics</option>
                        <option value="Reality-TV">Reality-TV</option>
                        <option value="Romance">Romance</option>
                        <option value="Sci-Fi">Sci-Fi</option>
                        <option value="Sport">Sport</option>
                        <option value="Talk Show">Talk Show</option>
                        <option value="Thriller">Thriller</option>
                        <option value="TV Special">TV Special</option>
                        <option value="War">War</option>
                        <option value="Western">Western</option>`
    }
}

function changeYear() {
    const yStart = yearStart.value
    const yEnd = yearEnd.value
    yearStart.innerHTML = ""
    yearEnd.innerHTML = ""

    for (i = 1900; i <= yEnd ; i++) {
        if (i != yStart) {
            yearStart.innerHTML += `<option value="${i}">${i}</option>`
        } else {
            yearStart.innerHTML += `<option value="${i}" selected>${i}</option>`
        }
    }
    for (i = year; i >= yStart ; i--) {
        if (i != yEnd) {
            yearEnd.innerHTML += `<option value="${i}">${i}</option>`
        } else {
            yearEnd.innerHTML += `<option value="${i}" selected>${i}</option>`
        }
    }
}


function changeRating() {
    if (minRating.value >= 10) {
        labRating.innerHTML = minRating.value.substr(0,1) +"."+ minRating.value.substr(1,1)
    } else {
        labRating.innerHTML = "0."+ minRating.value.substr(0,1)
    }
}


function getMovie(movTitle) {

    fetch(
      "https://ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com/entertainment/search/" +
        "?Skip=0" +
        "&Take=5" +
        "&Title=" + movTitle +
        "&Minimum_IvaRating=" + minRating.value +
        "&ProgramTypes=" + document.querySelector('input[name="type"]:checked').value +
        "&Includes=Releases,Contributors,Descriptions,Images,Genres" +
        "&YearRange_Start=" + yearStart.value +
        "&YearRange_End=" + yearEnd.value +
        "&Genres=" + genre.value +
        "&SortBy=" + resSort.value,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": apiHost,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        apiResult = response
        listRes(apiResult)
      })
      .catch((err) => {
        console.error(err)
      })
}

function listRes(res) {
  resList.innerHTML = ""
  res.Hits.forEach((element) => {
    
    if (element.Source.ImageCount > 0) {
      fetch(
        "https://ivaee-internet-video-archive-entertainment-v1.p.rapidapi.com/Images/" +
          element.Source.Images[0].FilePath +
          "/Redirect?Redirect=false",
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": apiHost,
          },
        }
      )
        .then((response) => response.json())
        .then((response) => {
            
          // Rating
          let rating = ""
          element.Source.IvaRating > 99 ? rating = "100" : rating = element.Source.IvaRating.toString().substr(0,1) +"."+ element.Source.IvaRating.toString().substr(1,1)

          // Director
          let director = []
          element.Source.Contributors.forEach((dir) => {
            if (dir.Job = "Director") director.push(dir.PersonName) 
          })

          // Genres Tags
          let genres = []
          for (i=0; i < element.Source.Genres.length; i++) {
            genres.push("<li>"+ element.Source.Genres[i] +"</li>")  
          }

          resList.innerHTML += `<div class="movie-list" id="movie-list">
                    <div class="movie-poster" style="background-image: url(${response.Url});"></div>
                    <div class="movie-info">
                        <h3 class="movie-title">${element.Source.OriginalTitle}</h3>
                        <ul class="movie-desc"> 
                            <li class="movie-year">${element.Source.Year} - </li>
                            <li class="movie-director"> ${director.join(", ")}</li>
                        </ul>
                        <span class="movie-score">${rating}</span>
                        <ul class="movie-tag">
                            ${genres.join()}
                        </ul>
                    </div>
                </div>`
        })
        .catch((err) => {
          console.error(err)
        })
    }
  })
}

/*
function getDetails() {
    console.log("WORK!") 
    console.log("TEST: "+apiResult)
    
    console.log("|" + movTitle + "|") 
    console.log("|" + minRating.value + "|") 
    console.log("|" + document.querySelector('input[name="type"]:checked').value + "|") 
    console.log("|" + yearStart.value + "|") 
    console.log("|" + yearEnd.value + "|") 
    console.log("|" + genre.value + "|") 
    console.log("|" + resSort.value + "|") 
    
    resList.innerHTML = `
        <div class="info-detail">
            <img src="${}" alt="" class="info-img">
            <div class="info-container">
                <h3 class="info-title">${}</h3>
                <div class="info-year"><b>Release Year:</b> ${}</div>
                <div class="info-time"><b>Time:</b> ${} min</div>
                <div class="info-lang"><b>Language:</b> ${}</div>
                <ul class="info-contributors">
                    <li> <b>Directors: </b> ${}</li>
                    <li> <b>Actors: </b> ${}</li>
                </ul>
                <p class="info-desc"><b>Description: </b>${}</p>
                <ul class="info-genres">
                    <b>Genres: </b>
                    <li>${}</li>
                    <li>${}</li>
                    <li>${}</li>
                    <li>${}</li>
                </ul>
                <a href="#" class="info-site">${}</a>
            </div>
            <span class="info-score"><i class="fas fa-star"></i> ${}</span>
            <span class="info-back"><i class="fas fa-chevron-circle-left"></i><p>BACK</p></span>
        </div>`


        /*
        <div class="info-detail">
            <img src="https://picsum.photos/300" alt="" class="info-img">
            <div class="info-container">
                <h3 class="info-title">Matrix Revolution</h3>
                <div class="info-year"><b>Release Year:</b> 2021</div>
                <div class="info-time"><b>Time:</b> 128 min</div>
                <div class="info-lang"><b>Language:</b> English</div>
                <ul class="info-contributors">
                    <li> <b>Directors: </b> Name Adad, Adada dfef</li>
                    <li> <b>Actors: </b> Name Adad, Adada dfef, Name Adad, Adada dfef</li>
                </ul>
                <p class="info-desc"><b>Description: </b>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt laborum vel, delectus esse voluptate in harum perferendis error velit totam distinctio, laboriosam omnis, porro quas expedita temporibus id culpa tempore?</p>
                <ul class="info-genres">
                    <b>Genres: </b>
                    <li>Drama</li>
                    <li>Documentary</li>
                    <li>Non-Fiction</li>
                    <li>Action</li>
                </ul>
                <a href="#" class="info-site">www.moviesite.com</a>
            </div>
            <span class="info-score"><i class="fas fa-star"></i> 6.5</span>
            <span class="info-back"><i class="fas fa-chevron-circle-left"></i><p>BACK</p></span>
        </div>
        
    
}
*/