export const getAllMovie = async () => {
    const res = await fetch('https://swapi.dev/api/films/');
    const resJson = await res.json();
    const editedMovieList = resJson.results.map((movie) => ({
        id: Number(
            movie.url
                .split('/')
                .filter(Boolean)
                .pop()
        ),
        title: movie.title,
        director: movie.director,
        releaseDate: movie.release_date,
    }));
    return editedMovieList;
};

export const getSingleMovie = async (id) => {
    const res = await fetch(`https://swapi.dev/api/films/${id}/`);
    const resJson = await res.json();
    const resCharacters = resJson.characters.map((url) =>
        fetch(url)
            .then((data) => data.json())
            .then((c) => c.name)
    );
    const resPlanets = resJson.planets.map((url) =>
        fetch(url)
            .then((data) => data.json())
            .then((c) => c.name)
    );
    const resSpecies = resJson.species.map((url) =>
        fetch(url)
            .then((data) => data.json())
            .then((c) => c.name)
    );
    const resStarships = resJson.starships.map((url) =>
        fetch(url)
            .then((data) => data.json())
            .then((c) => c.name)
    );
    const resVehicles = resJson.vehicles.map((url) =>
        fetch(url)
            .then((data) => data.json())
            .then((c) => c.name)
    );
    const characters = await Promise.all(resCharacters);
    const planets = await Promise.all(resPlanets);
    const species = await Promise.all(resSpecies);
    const starships = await Promise.all(resStarships);
    const vehicles = await Promise.all(resVehicles);
    const data = {
        id: id,
        characters,
        director: resJson.director,
        description: resJson.opening_crawl,
        planets,
        producer: resJson.producer,
        releaseDate: resJson.release_date,
        species,
        starships,
        title: resJson.title,
        vehicles,
    };
    return data;
};