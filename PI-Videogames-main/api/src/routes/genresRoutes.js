const { Router } = require('express');
const getAllGenres = require('../controllers/getAllGenres')
const genresRoutes = Router()

genresRoutes.get('/', async (req, res) => {
    try {
        const resp = await getAllGenres()
        res.status(200).json(resp)
    } catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = genresRoutes