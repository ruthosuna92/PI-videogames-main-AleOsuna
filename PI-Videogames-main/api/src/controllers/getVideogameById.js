const { Videogame, Genre } = require('../db')
require('dotenv').config()
const { API_KEY } = process.env
const axios = require('axios')



module.exports = async (idVideogame) => {

    try {
        
        if (isNaN(Number(idVideogame))) {
            const videogameDetailBD  = await Videogame.findOne({
                where: {id: idVideogame},
                include: { model: Genre, as: 'genres' }
            });
            return videogameDetailBD;
        } else {
            const { id, name, background_image, platforms, description, rating, genres } = (await axios(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)).data
            const videogameDetailApi = {
                id, 
                name, 
                background_image, 
                platforms: platforms.map((plat)=> plat.platform.name), 
                description, 
                rating, 
                genres: genres.map((gen)=>gen.name)
            }
            return videogameDetailApi
            //return videogameDetailBD
        }

    } catch (error) {
        throw new Error(error.message)
    }

}
