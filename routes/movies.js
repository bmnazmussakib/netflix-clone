const router = require('express').Router();
const Movie = require('../models/Movie');


// CREATE
router.post("/", async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body);

        try {
            const savedMovie = await newMovie.save();
            res.status(201).json(savedMovie)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You are not allowed")
    }
})

// UPDATE
router.put("/:id", async (req, res) => {
    if (req.user.isAdmin) {
        try {
            const updateMovie = await Movie.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
            res.status(200).json(updateMovie)
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You are not allowed")
    }
})

// DELETE
router.delete("/:id", async (req, res) => {
    if (req.user.isAdmin) {

        try {
            const deleteMovie = await Movie.findByIdAndDelete(req.params.id)
            res.status(200).json("Movie Delete Done")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You are not allowed")
    }
})

// GET 
router.get("/find/:id", async (req, res) => {

    try {
        const movie = await Movie.findById(req.params.id)
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET RANDOM MOVIE
router.get("/random", async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
        if (type === 'series') {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ])
        } else {
            movie = await Movie.aggregate([
                { $match: { isSeries: false } },
                { $sample: { size: 1 } }
            ])
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json(error)
    }
})

// GET ALL MOVIE
router.get("/", async (req, res) => {

    if (req.user.isAdmin) {
        try {
            const movies = await Movie.find();
            res.status(200).json(movies)

            // Recent Movie First
            // res.status(200).json(movies.reverse())
            
        } catch (error) {
            res.status(500).json(error)
        }
    } else {

    }
})




module.exports = router