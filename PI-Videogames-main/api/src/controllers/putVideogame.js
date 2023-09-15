const { Videogame, Genre } = require('../db');

module.exports = async (id, name, background_image, genres, description, platforms, rating, released) => {
  try {
    const game = await Videogame.findByPk(id);

    if (!game) throw new Error('Este videogame no existe!!');

    await game.setGenres([]);

    const newGenres = await Promise.all(
      genres.map(async (gen) => {
        let [genre] = await Genre.findOrCreate({ where: { name: gen } });
        return genre;
      })
    );
      console.log(newGenres);
    await game.addGenres(newGenres);

    game.name = name;
    game.background_image = background_image;
    game.description = description;
    game.platforms = platforms;
    game.rating = rating;
    game.released = released;

    await game.save();

    console.log('Videojuego actualizado con éxito.');
    
    const gameUpdated  = await Videogame.findOne({
        where: {id},        
        include: { model: Genre, 
            as: 'genres' , 
            attributes: ['name'],
            through: {attributes: []}
        }     
    });
    return {
        id: gameUpdated.id, 
        name: gameUpdated.name, 
        background_image: gameUpdated.background_image, 
        platforms: gameUpdated.platforms, 
        description: gameUpdated.description, 
        rating: gameUpdated.rating, 
        genres: gameUpdated.genres.map((gen)=>gen.name),
        released: gameUpdated.released
    };
  } catch (error) {
    throw error; 
  }
};

    
    // const videogame = await Videogame.create({ name, background_image, description, platforms, rating, released } );
    // console.log(videogame);

    // const newVideogame = await Promise.all(genres.map(async (gen) => {
    //     const idGenre = await Genre.findOne({ where: { name: gen } })
    //     const vg = await videogame.addGenre(idGenre)
    //     return vg
    // }))
    // return 'Videojuego creado exitosamente'




