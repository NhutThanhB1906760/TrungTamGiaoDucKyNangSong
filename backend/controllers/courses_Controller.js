const Courses = require("../models/courses_Model");

const coursesController = {
    //REGISTER
    create: async (req, res) => {
        try {
            console.log(req.body);
            const user = await Courses.create(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
    update: async (req, res) => {
        try {
            // console.log(req.params.id, req.body);
            const user = await Courses.update(req.params.id,req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    findOne: async (req, res) => {
        try {
            console.log(req.body);
            const user = await Courses.find(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Courses.getAll()
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Courses.delete(req.params.id)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Courses.deleteAll()
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = coursesController;
