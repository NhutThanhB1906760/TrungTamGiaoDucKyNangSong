const router = require("express").Router();

const moment = require('moment');


router.post('/', function (req, res, next) {
    console.log(req.body);
    const training_data = [
        { thu: 2, startTime: '13:00:00', endTime: '14:00', class: 'A1', id: 1 },
        { thu: 5, startTime: '13:00:00', endTime: '14:00', class: 'A1', id: 1 },
        { thu: 3, startTime: '10:00:00', endTime: '12:00', class: 'A2', id: 2 },
        { thu: 4, startTime: '09:00:00', endTime: '14:00', class: 'A2', id: 2 },
        { thu: 4, startTime: '19:00', endTime: '21:00', class: 'A3', id: 3 },
        { thu: 7, startTime: '15:00', endTime: '18:00', class: 'A3', id: 3 },
        // Thêm dữ liệu khác tại đây
    ];
    // Hàm chuyển đổi thời gian từ chuỗi thành số nguyên (số phút)
    function convertTimeToMinutes(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours * 60 + minutes;
    }

    const trainingData = req.body.training_data.map((item) => {
        return [
            // item.id,
            convertTimeToMinutes(item.startTime),
            convertTimeToMinutes(item.endTime),
        ];
    });

    const { exec, spawn } = require('child_process');
    var lable = req.body.training_data.map((item) => {

        return item.id

    });
    const choose = [[ convertTimeToMinutes(req.body.startTime), convertTimeToMinutes(req.body.endTime)]]
    // Chuyển đổi dữ liệu huấn luyện thành chuỗi JSON
    const inputJSON = JSON.stringify(trainingData);
    const inputJSON2 = JSON.stringify(lable);
    const inputJSON3 = JSON.stringify(choose);

    // Tạo một tiến trình Python và truyền dữ liệu qua tham số dòng lệnh
    const pythonProcess = spawn('python', ['decision_tree.py', inputJSON, inputJSON2, inputJSON3]);
    pythonProcess.stdout.on('data', (data) => {
        const result = data.toString();
        res.send(result).status(200)
        console.log(`Kết quả từ Python: ${result}`);
    });


});

module.exports = router;