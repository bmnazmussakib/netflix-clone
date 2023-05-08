const router = require('express').Router();
const List = require('../models/List');


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


// DELETE
router.delete("/:id", async (req, res) => {
    if (req.user.isAdmin) {

        try {
            const savedMovie = await List.findByIdAndDelete(req.params.id);
            res.status(201).json("The List has been deleted")
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You are not allowed")
    }
})


// GET
router.get("/", async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];

    try {
        if (condition) {
            if (typeQuery) {
                if (genreQuery) {
                    list = await List.aggregate([
                        { $sample: { size: 10 } },
                        { $match: { type: typeQuery, genre: genreQuery } }
                    ])
                }else {
                    list = await List.aggregate([
                        { $sample: { size: 10 } },
                        { $match: { type: typeQuery } }
                    ])
                }
            } else {
                list = await List.aggregate([{ $sample: { size: 10 } }])
            }
        } else {

        }
    } catch (error) {
        res.status(500).json(error)
    }
})








module.exports = router