// ES6 Query Selector Arrow Function
let $ = (selector) => (document.querySelectorAll(selector).length > 1) ? document.querySelectorAll(selector) : document.querySelector(selector)
// ES6 Create Element Arrow Function
let elemCreate = (element) => document.createElement(element)
// ES6 Set Attribute Arrow Function
let setA = (element, attribute, value) => element.setAttribute(attribute, value)
// ES6 Set Class Arrow Function
let setC = (element, value) => element.setAttribute('class', value)
// ES6 Change textContent Arrow Function
let tC = (element, value) => element.textContent = value
// ES6 Change innerHTML Arrow Function
let iH = (element, value) => element.innerHTML = value
// ES6 Append Child Arrow Function
let aC = (parent, child) => parent.appendChild(child)

// Initial Values

const API_KEY = '05e8e134e4a46808f28a798d17cc7854';
const MOVIE_DB_ENDPOINT = 'https://api.themoviedb.org';
const MOVIE_DB_IMAGE_ENDPOINT = 'https://image.tmdb.org/t/p/w300';
// const MOVIE_DB_ACTOR = 'https://image.tmdb.org/t/p/original';
let mid;
i = 1;

async function fetches() {
    // iH($('#mySideContainer'), " ")
    let search = document.forms[0][0].value
    let url1 = `https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=${search}&api_key=${API_KEY}` //keywordsearch 

    const data1 = await (await fetch(url1)).json()
    // console.log(data1);
    // console.log(search)

    data1.results.forEach(element => {
        mid = element.id
        let movie = elemCreate('section')
        title = elemCreate('h2')
        // description = elemCreate('p')
        // rating = elemCreate('p')
        // year = elemCreate('p')
        //Runtime skal tillægges efter 2nd fetch
        // runtime = elemCreate('p')
        poster_path = elemCreate('img')
        // credit_id = elemCreate('p')
        setC(movie, 'movieCard')
        poster_path.src = MOVIE_DB_IMAGE_ENDPOINT + element.poster_path


        // Nogo - append textcontent til andet end en section

        tC(title, element.title)
        // tC(description, element.overview)
        // tC(rating, element.vote_average)
        // tC(year, element.release_date)
        tC(poster_path, element.poster_path)
        // tC(credit_id, element.credit_id)


        aC($('body'), movie)
        aC(movie, title)
        aC(movie, poster_path)
        // aC(movie, credit_id)
        // aC(movie, description)
        // aC(movie, rating)
        // aC(movie, runtime)
        // aC(movie, year)
      
        let url2 = `https://api.themoviedb.org/3/movie/${mid}?api_key=${API_KEY}&append_to_response=videos,credits`
       

        movie.onclick = async function () {
            iH($('#mySideContainer'), '')
            data2 = await (await fetch(url2)).json()
            director = elemCreate("div")
            producer = elemCreate("div")
    
            openSidebar()

            youtubeid = data2.videos.results[0].key
            // console.log(data2);
            // console.log(youtubeid);
            trailer = elemCreate('div')
            title = elemCreate('p')
            description = elemCreate('p')
            runtime = elemCreate('p')
            rating = elemCreate('p')
            year = elemCreate('p')

            cast1 = elemCreate('p')
            cast2 = elemCreate('p')
            cast3 = elemCreate('p')

            iH(title, '<b>' + data2.title + '</b>')
            iH(description, data2.overview)
            iH(trailer, `<iframe width="650" height="360" src="https://www.youtube.com/embed/${youtubeid}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`)
            iH(runtime, data2.runtime + 'min')
            iH(rating, data2.vote_average)
            iH(year, data2.release_date)

            iH(cast1, '<b>' + data2.credits.cast[0].character + '</b> ' + data2.credits.cast[0].name)
            iH(cast2, '<b>' + data2.credits.cast[1].character + '</b> ' + data2.credits.cast[1].name)
            iH(cast3, '<b>' + data2.credits.cast[2].character + '</b> ' + data2.credits.cast[2].name)
            
            aC($('#mySideContainer'), title)
            aC($('#mySideContainer'), trailer)
            aC($('#mySideContainer'), description)
           

            aC($('#mySideContainer'), year)
            aC($('#mySideContainer'), rating)
            aC($('#mySideContainer'), runtime)

            aC($('#mySideContainer'), cast1)
            aC($('#mySideContainer'), cast2)
            aC($('#mySideContainer'), cast3)
          

            for (let i = 0; i < data2.credits.crew.length; i++) {

                switch (data2.credits.crew[i].job) {
                    case 'Director':
                        iH(director, '<b>Director </b>' + data2.credits.crew[0].name)
                        aC($('#mySideContainer'), director)
                        break;
                    case 'Producer':
                        iH(producer, '<b>Producer </b>' + data2.credits.crew[0].name)
                        aC($('#mySideContainer'), producer)
                        break;

                }

            }




            // Her skal der være en onclick funktion som måler ud fra en button eller andet..

        }

    })


}



// document.getElementById('search').onclick = fetched()