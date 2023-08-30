const { Router } = require('express');
const getVideogames = require('../controllers/getVideogames')
const getVideogameById = require('../controllers/getVideogameById')
const getVideogameByName = require('../controllers/getVideogameByName')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogamesRoutes = Router();
const { Videogame, Genre } = require('../db')


// videogamesRoutes.get('/', async (req, res)=>{
//     try {
//         const {name} = req.query
//         if(!name) await res.status(200).json(`Ruta get respondiendo con 100 videojuegos`)
        
//         res.status(200).json(`Ruta get query ${name} respondiendo`)
        
//     } catch (error) {
//         console.log(error);
//     }
    
// })

videogamesRoutes.get('/', async (req, res)=>{
    const {name} = req.query
    try {
        if(!name){
            const resp = await getVideogames()
            return res.status(200).json(resp)
        } else {    
            const resp = await getVideogameByName(name)
            res.status(200).json(resp)}
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})

videogamesRoutes.get('/:idVideogame', async (req, res)=>{
    const {idVideogame} = req.params
    try {
        if(idVideogame){
            const resp = await getVideogameById(idVideogame)
            return res.status(200).json(resp)
        }
        res.status(200).send('Ruta get :idVideogame respondiendo')
    } catch (error) {
        res.status(500).json(error.message);
    }
})

videogamesRoutes.post('/', (req, res) => {
    const {name, image, genres, description, platforms} = req.body
    res.status(200).json({name, image, genres, description, platforms})
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = videogamesRoutes;
