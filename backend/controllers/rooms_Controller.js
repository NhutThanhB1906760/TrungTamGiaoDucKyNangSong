const Rooms = require("../models/rooms_Model");


const RoomsController = {
    //REGISTER
    create: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Rooms.create(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
    update: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Rooms.update(req.params.id, req.body)
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
    findOne: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Rooms.find(req.body)
            res.status(200).json(user);
        } catch (err) {
             res.send(undefined).status(500);
        }
    },
    getAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Rooms.getAll()
            res.status(200).json(user);
        } catch (err) {
             res.send(undefined).status(500);
        }
    },
    delete: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Rooms.delete(req.params.id)
            res.status(200).json(user);
        } catch (err) {
             res.send(undefined).status(500);
        }
    },
    deleteAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Rooms.deleteAll()
            res.status(200).json(user);
        } catch (err) {
             res.send(undefined).status(500);
        }
    },
};

module.exports = RoomsController;
