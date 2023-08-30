const { Videogame, Genre } = require('../db')
require('dotenv').config()
const { API_KEY } = process.env
const axios = require('axios')



module.exports = async (nameVideogame) => {

    try {
        const nameLow = nameVideogame.toLowerCase()
        const videogameNameBD = await Videogame.findAll({
            where: { name: nameLow },
            include: { model: Genre, as: 'genres' }
        });

        const videogames = (await axios(`https://api.rawg.io/api/games?search=${nameLow}&key=${API_KEY}`)).data.results
        const videogameName = [...videogames, ...videogameNameBD].map((videogame)=> {
            return {
                id: videogame.id,
                name: videogame.name,
                image: videogame.background_image,
                genre: videogame.genres.map((gen)=> gen.name)
            }
        })
        console.log(videogameName.slice(0, 15));
        return videogameName.slice(0, 15)
        //return videogameDetailBD
    }

    catch (error) {
    throw new Error(error.message)
}

}
