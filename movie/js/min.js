// Dennis
let $ = (selector) => (document.querySelectorAll(selector).length > 1) ? document.querySelectorAll(selector) : document.querySelector(selector)
let elemCreate = (element) => document.createElement(element)
let setA = (element, attribute, value) => element.setAttribute(attribute, value)
let setC = (element, value) => element.setAttribute('class', value)
let tC = (element, value) => element.textContent = value
let iH = (element, value) => element.innerHTML = value
let aC = (parent, child) => parent.appendChild(child)


const API_KEY = '05e8e134e4a46808f28a798d17cc7854';
const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';
const MOVIE_DB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w200';
let mid;
i = 1;
let fcontainer = document.getElementById('filmContainer'); // Casper

async function fetches() {
    let search = document.forms[0][0].value
    let url1 = `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${search}&api_key=${API_KEY}&language=pt-Dk`
    fcontainer.innerHTML = "";

    const data1 = await (await fetch(url1)).json()

    data1.results.forEach(element => {
        mid = element.id
        let movie = elemCreate('section')
        title = elemCreate('h2')
        poster_path = elemCreate('img')
        setC(movie, 'movieCard')
        poster_path.src = MOVIE_DB_IMAGE_ENDPOINT + element.poster_path

        tC(title, element.title)
        tC(poster_path, element.poster_path)


        aC(document.getElementById('filmContainer'), movie) // Casper
        aC(movie, poster_path)

        let url2 = `https://api.themoviedb.org/3/movie/${mid}?api_key=${API_KEY}&append_to_response=videos,credits`


        movie.onclick = async function () {
            iH($('#mySideContainer'), '')
            data2 = await (await fetch(url2)).json()
            director = elemCreate("div")
            producer = elemCreate("div")

            openSidebar(); // Casper

            youtubeid = data2.videos.results[0].key

         console.log(data2);

       

            trailer = elemCreate('div')
            title = elemCreate('p')
            description = elemCreate('p')
            runtime = elemCreate('p')
            budget = elemCreate('p')
            rating = elemCreate('p')
            year = elemCreate('p')
            crew = elemCreate('img')

            cast1 = elemCreate('p')
            cast2 = elemCreate('p')
            cast3 = elemCreate('p')

            iH(title, '<b>' + '<div class="taright">X</div>' + 'Title:' + '</b>' + data2.title)
            iH(description, '<b>Description: </b>' + data2.overview)
            iH(trailer, `<iframe width="650" height="360" src="https://www.youtube.com/embed/${youtubeid}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
           
            iH(runtime, '<b>Runtime: </b>' + data2.runtime + 'min')
            iH(rating, '<b>Rating: </b>' + data2.vote_average)
            iH(year, '<b>Release date: </b>' + data2.release_date)
            iH(budget, '<b>budget: </b>' + data2.budget + '$')

            console.log(data2.credits.cast[0])
            iH(cast1, '<b>Cast: </b>' + '<br>' + '<b>' + data2.credits.cast[0].character + '</b> ' + data2.credits.cast[0].name + `<img src="https://image.tmdb.org/t/p/w185/${data2.credits.cast[0].profile_path}" />`)
            iH(cast2, '<b>' + data2.credits.cast[1].character + '</b> ' + data2.credits.cast[1].name + `<img src="https://image.tmdb.org/t/p/w185/${data2.credits.cast[1].profile_path}"/>`)
            iH(cast3, '<b>' + data2.credits.cast[2].character + '</b> ' + data2.credits.cast[2].name + `<img src="https://image.tmdb.org/t/p/w185/${data2.credits.cast[2].profile_path}"/>`)


            aC($('#mySideContainer'), title)
            aC($('#mySideContainer'), trailer)
            aC($('#mySideContainer'), description)

            aC($('#mySideContainer'), year)
            aC($('#mySideContainer'), rating)
            aC($('#mySideContainer'), runtime)
            aC($('#mySideContainer'), budget)
         
            aC($('#mySideContainer'), crew)
            aC($('#mySideContainer'), cast1)
            aC($('#mySideContainer'), cast2)
            aC($('#mySideContainer'), cast3)



            for (let i = 0; i < data2.credits.crew.length; i++) {

                switch (data2.credits.crew[i].job) {
                    case 'Director':
                        iH(director, '<b><span class="color-green">Director: </span></b>' + data2.credits.crew[i].name + `<img src="https://image.tmdb.org/t/p/w185/${data2.credits.crew[0].profile_path}" />`)
                        aC($('#mySideContainer'), director)
                        break;
                    case 'Producer':
                        iH(producer, '<b><span class="color-green">Producer: </span></b>' + data2.credits.crew[i].name + `<img src="https://image.tmdb.org/t/p/w185/${data2.credits.crew[1].profile_path}" />`)
                        aC($('#mySideContainer'), producer)
                        break;

                }

            }


        }
    });


}

// Casper
// use enter key to search
// Get the input field
var input = document.getElementById("exampleInputEmail1");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keydown", function (event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        document.getElementById("search").click();
    }
});
