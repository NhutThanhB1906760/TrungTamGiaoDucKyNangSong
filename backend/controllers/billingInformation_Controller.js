const BillingInformation = require("../models/billingInformation_Model");
const sendEmail = require('../sendEmail/sendEmail')
const moment = require('moment')
const Personnel = require('../models/personnel_Model')
const BillingInformationController = {
    //REGISTER
    create: async (req, res) => {
        try {
            // console.log(req.body);
            let data = {
                payment_methods: req.body.payment_methods,
                payment_amount: req.body.payment_amount,
                personnel_id: req.body.personnel_id,
                regInfo_id: req.body.regInfo_id
            }
            const user = await BillingInformation.create(data)
            res.status(200).json(user);
            //     cours_name:cours.value,
            //     class_name:classStudy.value,
            let methor = `<p>Hình thức thanh toán: Trực tuyến VNPAY</p>`

            if (req.body.payment_methods == 0) {
                let namePer = await Personnel.find({ id: req.body.personnel_id })

                methor = `<p>Hình thức thanh toán: Tiền mặt</p>
                <p>Nhân viên thu tiền: ${namePer[0].name}`
            }
            const mailOptions = {
                from: process.env.GMAIL_NAME, // Email của bạn
                to: 'real07123456@gmail.com', // Email người nhận
                subject: 'Hóa đơn thanh toán học phí', // Tiêu đề email
                html: `
                <html>
                    <body>
                <h2>Thông tin thanh toán</h2>
                <p>Thời gian thanh toán: ${moment(new Date()).format('HH:mm DD-MM-YYYY')}</p>
                ${methor}
                <p>Khóa học: ${req.body.cours_name}</p>
                <p>Lớp học đăng ký: ${req.body.class_name}</p>
                <p>Số tiền thanh toán: ${req.body.payment_amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                </body>
                </html>`
            };
            sendEmail(mailOptions)
        } catch (err) {
            res.send(undefined).status(500);
        }
    },
    update: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await BillingInformation.update(req.params.id, req.body)
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);

        }
    },
    findOne: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await BillingInformation.find(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);

        }
    },
    getAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await BillingInformation.getAll()
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);

        }
    },
    delete: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await BillingInformation.delete(req.params.id)
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);

        }
    },
    deleteAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await BillingInformation.deleteAll()
            res.status(200).json(user);
        } catch (err) {
            res.send(undefined).status(500);

        }
    },
};

module.exports = BillingInformationController;
