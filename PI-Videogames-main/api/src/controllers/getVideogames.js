const axios = require('axios');
require('dotenv').config()
const {API_KEY} = process.env
const size = 25
const {Videogame, Genre} = require('../db')

module.exports = async () => {
    try {
        const resp1 = (await axios(`https://api.rawg.io/api/games?page_size=40&page=3&key=${API_KEY}`)).data.results
        const resp2 = (await axios(`https://api.rawg.io/api/games?page_size=40&page=6&key=${API_KEY}`)).data.results
        const resp3 = (await axios(`https://api.rawg.io/api/games?page_size=20&page=9&key=${API_KEY}`)).data.results
        const videogamesApi = [...resp1, ...resp2, ...resp3].map((videogame)=> {
            return {
                id: videogame.id,
                name: videogame.name,
                background_image: videogame.background_image,
                genres: videogame.genres.map((gen)=>{ 
                return {name: gen.name}})
            }
        })

        const videogamesBD = await Videogame.findAll({
            include: { model: Genre, 
                as: 'genres' , 
                attributes: ['name'],
                through: {attributes: []}
            },
            attributes: ['id', 'name', 'background_image']
            
        });
          console.log(videogamesBD);
        return [...videogamesBD, ...videogamesApi]
    } catch (error) {
        console.log(error.message);
    }
}