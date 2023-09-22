const Courses_proGroups = require("../models/courses-proGroups_Model");


const Courses_proGroupsController = {
    //REGISTER
    create: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Courses_proGroups.create(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    update: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Courses_proGroups.update(req.params.id, req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    findOne: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Courses_proGroups.find(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
   
    getAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Courses_proGroups.getAll()
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Courses_proGroups.delete(req.params.id)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Courses_proGroups.deleteAll()
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = Courses_proGroupsController;
