const Files = require("../models/files_Model");
const multer = require('multer')
const path = require('path');
// Cấu hình Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Thư mục lưu trữ file
    },
    filename: function (req, file, cb) {

        const originalname = file.originalname;
        const extension = path.extname(originalname); // Lấy đuôi của tệp
        // Tạo tên tệp với đuôi
        const newFileName = Date.now() + '-' + originalname;

        cb(null, newFileName); // Tên file lưu trữ  
    },
});

const upload = multer({ storage: storage });

const FilesController = {
    //REGISTER
    create: async (req, res) => {
        try {
            // Xử lý tệp tải lên bằng Multer
            upload.array('files', 20)(req, res, function (err) {
                if (err) {
                    return res.status(400).json({ message: 'Lỗi khi tải lên tệp.' });
                }
                console.log(req.files);
                console.log(req.body);

                FilesController.save(req, res)

            });


        } catch (err) {
            res.status(500).json(err);
        }
    },
    save: async (req, res) => {
        try {
            req.files.forEach(async file => {

                const extension = path.extname(file.originalname).slice(1); // Lấy đuôi của tệp
                const link = 'http://localhost:3000/uploads/' + file.filename
                const files = {
                    name: file.originalname,
                    name_change: file.filename,
                    link: link, type: extension,
                    courses_id: req.body?.courses_id,
                    subscribers_id: req.body?.subscribers_id,
                    posts_id: req.body?.posts_id,
                    personnel_id: req.body?.personnel_id,
                    test: req.body?.test
                }
                console.log(req.body.subscribers_id);
                const user = await Files.create(files)
            });
            res.status(200).json(true)


        } catch (err) {
            throw err
        }
    },
    update: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Files.update(req.params.id, req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    findOne: async (req, res) => {
        try {
            console.log(req.body);
            const user = await Files.find(req.body)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    getAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Files.getAll()
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    delete: async (req, res) => {
        try {
            console.log(req.params.id);
            const user = await Files.delete(req.params.id)
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    deleteAll: async (req, res) => {
        try {
            // console.log(req.body);
            const user = await Files.deleteAll()
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports = FilesController;
