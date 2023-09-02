import Cards from "../Cards/Cards"


const Home = () => {

    const videogames = [{
        id: 908462,
        name: "MAURICE",
        background_image: "https://media.rawg.io/media/screenshots/ee5/ee51a13c66a951d8d19ab49ad3809b63.jpg",
        genres: []
    },
    {
        id: 412447,
        name: "Reach (Mauricio Castillo)",
        background_image: "https://media.rawg.io/media/screenshots/843/843cdcedebe333b86cea258afe188cea.jpg",
        genres: []
    },
    {
        id: 722296,
        name: "Detetive (Mauriiicio)",
        background_image: "https://media.rawg.io/media/screenshots/bbb/bbbe68b00957e60bb2ca26aea5aceea8.jpg",
        genres: [
            {
                name: "Adventure"
            }
        ]
    },
    {
        id: 850501,
        name: "Team 13 - The Legend of Maurice",
        background_image: "https://media.rawg.io/media/screenshots/739/73988c574f64da0c171465c1b80b1f54.jpg",
        genres: []
    }]
    return (
        <div>
            <p>Soy el Home!!</p>
            <select >
                <option value="A">Ascendente</option>
                <option value="D">Descendente</option>
            </select>
            <select >
                <option value='Genre'>Genre</option>
                <option value='Api'>Api</option>
                <option value='Database'>Database</option>
            </select>
            <Cards videogames={videogames}/>
            
        </div>
    )
}

export default Home