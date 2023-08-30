const axios = require('axios');
require('dotenv').config()
const {API_KEY} = process.env
const size = 25
const {Videogame, Genre} = require('../db')

module.exports = async () => {
    try {
        const resp1 = (await axios(`https://api.rawg.io/api/games?page_size=${size}&page=1&key=${API_KEY}`)).data.results
        const resp2 = (await axios(`https://api.rawg.io/api/games?page_size=${size}&page=1&key=${API_KEY}`)).data.results
        const resp3 = (await axios(`https://api.rawg.io/api/games?page_size=${size}&page=1&key=${API_KEY}`)).data.results
        const resp4 = (await axios(`https://api.rawg.io/api/games?page_size=${size}&page=1&key=${API_KEY}`)).data.results
        const videogamesApi = [...resp1, ...resp2, ...resp3, ...resp4].map((videogame)=> {
            return {
                id: videogame.id,
                name: videogame.name,
                image: videogame.background_image,
                genre: videogame.genres.map((gen)=> gen.name)
            }
        })

        const videogamesBD = await Videogame.findAll({
            include: { model: Genre, as: 'Genres' }
          });

        return [...videogamesApi, ...videogamesBD]
    } catch (error) {
        console.log(error.message);
    }
}