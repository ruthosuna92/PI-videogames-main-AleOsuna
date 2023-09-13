const {Genre} = require('../db')

module.exports = async () => {
    try {
        const genres = await Genre.findAll();
        if(!genres.length) throw new Error('No existen géneros en la base de datos!')
        return genres 
    } catch (error) {
        throw error
    }
}