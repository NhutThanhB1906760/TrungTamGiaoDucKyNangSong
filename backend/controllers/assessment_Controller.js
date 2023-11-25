const Assessment = require("../models/assessment_Model");

// import db from '../models/index'
// let { db } = require('../models/index')
const AssessmentController = {
    //REGISTER
    create: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Assessment.create(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    update: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Assessment.update(req.params.id, req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    findOne: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Assessment.find(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Assessment.getAll()
            // let data = await db.Users.findAll()
            // console.log(data);
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Assessment.delete(req.params.id)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Assessment.deleteAll()
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = AssessmentController;
