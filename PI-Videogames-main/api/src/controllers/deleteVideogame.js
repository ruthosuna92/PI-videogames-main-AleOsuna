const { Videogame} = require('../db')

module.exports = async (id) => {
    try {
        if(!id) throw new Error('No se puede realizar la acción')
        const game = await Videogame.findByPk(id);
    
        if (!game) throw new Error('No existe este videojuego!!')
    
        await game.destroy();

        return 'El videojuego fue eliminado exitosamente'

      } catch (error) {
        throw error
      }
}