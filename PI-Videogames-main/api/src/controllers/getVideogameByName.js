const { Videogame, Genre } = require('../db')
require('dotenv').config()
const { API_KEY } = process.env
const axios = require('axios')
const {Op}= require('sequelize')



module.exports = async (nameVideogame) => {

    try {
        const nameLow = nameVideogame.toLowerCase()
        const videogameNameBD = await Videogame.findAll({
            where: { name: {[Op.iLike]: `%${nameLow}%` } },
            include: { model: Genre, 
                as: 'genres' , 
                attributes: ['name'],
                through: {attributes: []}
            },
            
        });

        const videogames = (await axios(`https://api.rawg.io/api/games?search=${nameLow}&key=${API_KEY}`)).data.results
        const videogameName = [...videogames].map((videogame)=> {
            return {
                id: videogame.id,
                name: videogame.name,
                image: videogame.background_image,
                genre: videogame.genres.map((gen)=> gen.name)
            }
        })
        console.log(videogameNameBD);
        return [...videogameNameBD, ...videogameName].slice(0, 15)
        //return videogameDetailBD
    }

    catch (error) {
    throw new Error(error.message)
}

}
