const MediumScore = require("../models/mediumScore_Model");


const MediumScoreController = {
    //REGISTER
    create: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await MediumScore.create(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    update: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await MediumScore.update(req.params.id,req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    findOne: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await MediumScore.find(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await MediumScore.getAll()
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await MediumScore.delete(req.params.id)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await MediumScore.deleteAll()
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = MediumScoreController;
