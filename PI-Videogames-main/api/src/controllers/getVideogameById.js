const { Videogame, Genre } = require('../db')
require('dotenv').config()
const { API_KEY } = process.env
const axios = require('axios')



module.exports = async (idVideogame) => {
    try {
        if(!idVideogame) throw new Error('No se encuentra el id')
        if (isNaN(Number(idVideogame))) {
            const videogameDetailBD  = await Videogame.findOne({
                where: {id: idVideogame},        
                include: { model: Genre, 
                    as: 'genres' , 
                    attributes: ['name'],
                    through: {attributes: []}
                }     
            });
            return {
                id: videogameDetailBD.id, 
                name: videogameDetailBD.name, 
                background_image: videogameDetailBD.background_image, 
                platforms: videogameDetailBD.platforms, 
                description: videogameDetailBD.description, 
                rating: videogameDetailBD.rating, 
                genres: videogameDetailBD.genres.map((gen)=>gen.name),
                released: videogameDetailBD.released
            };
        } else {
            const { id, name, background_image, platforms, description, rating, genres, released } = (await axios(`https://api.rawg.io/api/games/${idVideogame}?key=${API_KEY}`)).data

            const videogameDetailApi = {
                id, 
                name, 
                background_image, 
                platforms: platforms.map((plat)=> plat.platform.name).join(', '), 
                description, 
                rating, 
                genres: genres.map((gen)=>gen.name),
                released
            }
            return videogameDetailApi
        }
    } catch (error) {
        throw error
    }
}
