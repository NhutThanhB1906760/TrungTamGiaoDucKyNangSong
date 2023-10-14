const ClassNotification = require("../models/ClassNotification_Model");
const sendEmail = require('../sendEmail/sendEmail')
const Class = require("../models/class_Model");
const Courses = require("../models/courses_Model");

const ClassNotificationController = {
    //REGISTER
    create: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await ClassNotification.create(req.body)
            res.status(200).json(user);
            let nameClass=await Class.find({id:req.body.class_id})
            let nameCours=await Courses.find({id:nameClass[0].courses_id})
            const mailOptions = {
                from: process.env.GMAIL_NAME, // Email của bạn
                to: 'real07123456@gmail.com', // Email người nhận
                subject: `Thông báo đến lớp ${nameClass[0].name} - ${nameCours[0].name}`, // Tiêu đề email
                html: req.body.content
            };
            sendEmail(mailOptions)
        } catch (err) {
            res.status(500).json(err);
        }
    },
    update: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await ClassNotification.update(req.params.id,req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    findOne: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await ClassNotification.find(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await ClassNotification.getAll()
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await ClassNotification.delete(req.params.id)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await ClassNotification.deleteAll()
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = ClassNotificationController;
