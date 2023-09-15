const { Router } = require('express');
const getVideogames = require('../controllers/getVideogames')
const getVideogameById = require('../controllers/getVideogameById')
const getVideogameByName = require('../controllers/getVideogameByName')
const postVideogame = require('../controllers/postVideogame')
const putVideogame = require('../controllers/putVideogame')
const deleteVideogame = require('../controllers/deleteVideogame')
const videogamesRoutes = Router();




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
            
            const resp = await getVideogameById(idVideogame)
            console.log(resp);
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

videogamesRoutes.put('/', async (req, res) => {
    try {
        const {id, name, background_image, genres, description, platforms, rating, released} = req.body
        if(!id && !name && !background_image || !genres || !description || !platforms || !rating || !released){
            res.status(404).send('Ingrese la información correcta')
        } else {

            const resp = await putVideogame(id, name, background_image, genres, description, platforms, rating, released)
            res.status(200).json(resp)
        }        
    } catch (error) {
        res.status(500).json(error.message)
    }
})
videogamesRoutes.delete('/:idVideogame', async (req, res) => {
    try {
      const { idVideogame } = req.params;
        const resp = await deleteVideogame(idVideogame)
      res.status(200).send(resp); 
    } catch (error) {
      console.error('Error al eliminar el videojuego:', error.message);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  });
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = videogamesRoutes;
