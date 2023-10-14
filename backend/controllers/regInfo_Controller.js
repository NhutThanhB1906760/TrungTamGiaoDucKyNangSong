const RegInfo = require("../models/regInfo_Model");
const ClassInfo = require("../models/class_Model")
const sendEmail = require('../sendEmail/sendEmail')
const moment = require('moment');
const Courses = require("../models/courses_Model");

const RegInfoController = {
    //REGISTER
    create: async (req, res) => {
        try {
            console.log(req.body);
            let classInfo = await ClassInfo.find({id: req.body.class_id})
            let numberReg=await RegInfo.countNumber(req.body.class_id)
            console.log(classInfo[0].quantity,numberReg.length);
            if(classInfo[0].quantity > numberReg.length){
                const user = await RegInfo.create(req.body)
                res.status(200).json(user);
                let coursName=await Courses.find({id:classInfo[0].courses_id})
                console.log(coursName);
                const mailOptions = {
                    from: process.env.GMAIL_NAME, // Email của bạn
                    to: 'real07123456@gmail.com', // Email người nhận
                    subject: 'Đăng ký khóa học', // Tiêu đề email
                    html: `
                    <html>
                        <body>
                    <h2>Thông tin đăng ký</h2>
                    <p>Thời gian đăng ký: ${moment(new Date()).format('HH:mm DD-MM-YYYY')}</p>
                    <p>Khóa học: ${coursName[0].name}</p>
                    <p>Lớp học đăng ký: ${classInfo[0].name}</p>
                    <p>Học phí khóa học: ${req.body.fees_calculated.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                    </body>
                    </html>`
                };
                sendEmail(mailOptions)
            }
            else{
                res.send(false).status(200);
            }
        } catch (err) {
            res.send(undefined).status(500);
        }
    },

    update: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await RegInfo.update(req.params.id, req.body)
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
    findOne: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await RegInfo.find(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
    getAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await RegInfo.getAll()
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
    delete: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await RegInfo.delete(req.params.id)
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
    deleteAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await RegInfo.deleteAll()
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
};

module.exports = RegInfoController;
