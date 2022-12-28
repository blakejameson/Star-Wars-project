const axios = require('axios').default;
const getPerson = async (id) =>{
    try{
        const res = await axios.get(`https://swapi.dev/api/people/${id}`);
        let data = res.data
        let movies = data.films
        for (let x of movies){   
            console.log(x)
            getFilm(x)
        }        
    }
    catch (e) {
        console.log("ERROR",e)
    }
};

const getFilm = async (url) =>{
    try{
        const response = await axios.get(url);
        console.log(response.data.title);
    }
    catch (e){
        console.log(e);
    }
}

const printFilms = async (films_array) =>{
    for (let movie_title of films_array){
        let ok = getFilm(movie_title)
    }
}

const getFilms = async () =>{
    try{
        const res = await axios.get(`https://swapi.dev/api/films/`);        
        console.log(res.data);
    }
    catch (e) {
        console.log("ERROR",e)
    }
};

const infoAboutPerson = async (id) =>{
    try{
        const res = await axios.get(`https://swapi.dev/api/people/${id}`);
        let data = res.data;
        console.log(data);
        console.log(`Name: ${data.name}`);
        console.log(`Height: ${data.height}`);
        console.log(`Mass: ${data.mass}`);
        console.log(`Hair Color: ${data.hair_color}`);
        console.log(`Skin Color: ${data.skin_color}`);
        console.log(`Eye Color: ${data.eye_color}`);
        console.log(`Birth Year: ${data.birth_year}`);
        console.log(`Gender: ${data.gender}`)

        let homeworld_url = data.homeworld;
        console.log(homeworld_url)
        let homeworld_name = await getHomeWorldName(homeworld_url);
        console.log(`Home World: ${homeworld_name}`)
        console.log(`Present in Films:\n`)
        let films_present_in = data.films;
        let films = await film_names(films_present_in);
        for (let x of films){
            console.log(x);
        }

        console.log(`Species: ${data.species}`);
        let vehicle_urls = data.vehicles

        let vehicle_names = await getVehicleNames(vehicle_urls);
        for (let x of vehicle_names){
            console.log(x)
        }
        //vehicles
        //starships



    }
    catch (e){
        console.log(e)
    }
}
const getHomeWorldName = async (url) =>{
    let res = await axios.get(url);
    return res.data.name;
}

const film_names = async (url_array) =>{
    let final = []
    for (let film of url_array){
        let film_name = await axios.get(film)
        final.push(film_name.data.title)
    }
    return final
}

const getVehicleNames = async (vehicle_urls) =>{
    let final=[]
    for (let url of vehicle_urls){
        let namee = await axios.get(url)
        final.push(namee.model);
    }
    return final;
}


infoAboutPerson(1);
//getHomeWorldName('https://swapi.dev/api/planets/1/')

