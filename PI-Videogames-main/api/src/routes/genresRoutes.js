const genresRoutes = require('express').Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
genresRoutes.get('/', (req, res)=>{
    res.status(200).send('Ruta get genres respondiendo')
})





// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


module.exports = genresRoutes;
