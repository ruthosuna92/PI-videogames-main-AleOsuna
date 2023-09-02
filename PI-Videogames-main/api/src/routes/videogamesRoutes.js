const { Router } = require('express');
const getVideogames = require('../controllers/getVideogames')
const getVideogameById = require('../controllers/getVideogameById')
const getVideogameByName = require('../controllers/getVideogameByName')
const postVideogame = require('../controllers/postVideogame')
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
            res.status(200).json(resp)
        }
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})

videogamesRoutes.get('/:idVideogame', async (req, res)=>{
    let {idVideogame} = req.params
    console.log(idVideogame);
    try {
        if(idVideogame){
            
            const resp = await getVideogameById(Number(idVideogame))
            return res.status(200).json(resp)
        }
        res.status(200).send('Ruta get :idVideogame respondiendo')
    } catch (error) {
        res.status(500).json(error.message);
    }
})

videogamesRoutes.post('/', async (req, res) => {
    try {
        const {name, background_image, genres, description, platforms, rating, released} = req.body
        if(!name || !background_image || !genres || !description || !platforms || !rating || !released){
            res.status(404).send('Ingresar los datos completos')
        } else {
            const resp = await postVideogame(name, background_image, genres, description, platforms, rating, released)
            res.status(200).json(resp)
        }        
    } catch (error) {
        res.status(500).json(error.message)
    }
})

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = videogamesRoutes;
