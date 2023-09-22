const Position = require("../models/position_Model");


const PositionController = {
    //REGISTER
    create: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Position.create(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
    update: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Position.update(req.params.id,req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).send(undefined);
        }
    },
    findOne: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Position.find(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Position.getAll()
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Position.delete(req.params.id)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Position.deleteAll()
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = PositionController;
