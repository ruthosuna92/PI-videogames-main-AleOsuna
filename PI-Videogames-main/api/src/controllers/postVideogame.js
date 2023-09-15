const { Videogame, Genre } = require('../db')


module.exports = async (name, background_image, genres, description, platforms, rating, released) => {

    try {
        
        const vgFind = await Videogame.findOne({ where: { name } })
    
        if(vgFind) throw Error('Ya existe este videogame')
        
        const videogame = await Videogame.create({ name, background_image, description, platforms, rating, released } );
        console.log(videogame);
    
        const newVideogame = await Promise.all(genres.map(async (gen) => {
            const idGenre = await Genre.findOne({ where: { name: gen } })
            const vg = await videogame.addGenre(idGenre)
            return vg
        }))
        return 'Videojuego creado exitosamente'
    } catch (error) {
        throw error
    }
}



