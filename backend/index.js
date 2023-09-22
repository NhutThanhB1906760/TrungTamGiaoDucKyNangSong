const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(cookieParser());
app.use(express.json());
const authRoute = require("./routes/auth_Route");
const coursesRoute = require("./routes/courses_Route");
const promotionTimeRoute = require("./routes/promotionTime_Route");
const promotionGroupsRoute = require("./routes/promotionGroups_Route");
const courses_proGroupsRoute = require("./routes/courses-proGroups_Route");
const personnelRoute = require("./routes/personnel_Route");
const positionRoute = require("./routes/position_Route");
const postsRoute = require("./routes/posts_Route");
const accountsNotificationRoute = require("./routes/accountsNotification_Route");
const assessmentRoute = require("./routes/assessment_Route");
const attendanceRoute = require("./routes/attendance_Route");
const billingInformationRoute = require("./routes/billingInformation_Route");
const classNotificationRoute = require("./routes/classNotification_Route");
const classStudyTimeRoute = require("./routes/classStudyTime_Route");
const classRoute = require("./routes/class_Route");
const filesRoute = require("./routes/files_Route");
const mediumScoreRoute = require("./routes/mediumScore_Route");
const regInfoRoute = require("./routes/regInfo_Route");
const roomsRoute = require("./routes/rooms_Route");
const studyTimeRoute = require("./routes/studyTime_Route");
const subscribersRoute = require("./routes/subscribers_Route");

const vnpay = require('./routes/vnpay')
// const userRoute = require("./routes/user");
dotenv.config();



const knex = require('knex')(require('./database/dbConnect'));
knex.select(
  knex.raw('CONVERT_TZ("startTime", "+00:00", "+07:00") AS vietnam_time')
)
.from('study_time')
.then((result) => {
  // Kết quả sẽ chứa cột 'vietnam_time' với thời gian đã chuyển đổi
  console.log(result);
})
.catch((error) => {
  console.error(error);
})
// knex('courses').where({ id: 1 }).select("*")
//   .then(rows => {
//     console.log(rows);
//   })
//   .catch(error => {
//     console.error(error);
//   });
  // knex('courses')
  //           .insert({ name: 'payload.name', content: "payload.content",fee:114,object:'ádads' })
  //           .then(() => {
  //           }).catch(err => {
  //               throw err
  //           })
// knex('users').select('*')
//   .then(rows => {
//     console.log(rows);
//   })
//   .catch(error => {
//     console.error(error);
//   });
// knex('users')
//   .join('cccd', 'users.id', '=', 'cccd.idUser')
//   .select('users.name', 'cccd.cccd')
//   .then(rows => {
//     console.log(rows);
//   });


//*****Send Mail
// const nodemailer = require('nodemailer');

// // Tạo một transporter cho gửi email
// const transporter = nodemailer.createTransport({
//   service: 'Gmail', // Tên dịch vụ email
//   auth: {
//     user: process.env.GMAIL_NAME, // Email của bạn
//     pass: process.env.GMAIL_PASS // Mật khẩu của bạn
//   }
// });

// // Cấu hình nội dung email
// const mailOptions = {
//   from: process.env.GMAIL_NAME, // Email của bạn
//   to: 'real07123456@gmail.com', // Email người nhận
//   subject: 'Test Email', // Tiêu đề email
//   text: 'Hello from Node.js' // Nội dung email
// };

// // Gửi email
// transporter.sendMail(mailOptions, (error, info) => {
//   if (error) {
//     console.log('Error:', error);
//   } else {
//     console.log('Email sent:', info.response);
//   }
// });
//***** */

//ROUTES
app.use("/api/vnpay", vnpay);
app.use("/api/v1/auth", authRoute);
app.use("/api/courses",coursesRoute)
app.use("/api/promotionTime",promotionTimeRoute)
app.use("/api/promotionGroups",promotionGroupsRoute)
app.use("/api/courses_proGroups",courses_proGroupsRoute)
app.use("/api/personnel",personnelRoute)
app.use("/api/position",positionRoute)
app.use("/api/posts",postsRoute)
app.use("/api/accountsNotification",accountsNotificationRoute)
app.use("/api/assessment",assessmentRoute)
app.use("/api/attendance",attendanceRoute)
app.use("/api/billingInformation",billingInformationRoute)
app.use("/api/classNotification",classNotificationRoute)
app.use("/api/class",classRoute)
app.use("/api/class_StudyTime",classStudyTimeRoute)
app.use("/api/files",filesRoute)
app.use("/api/mediumScore",mediumScoreRoute)
app.use("/api/regInfo",regInfoRoute)
app.use("/api/rooms",roomsRoute)
app.use("/api/studyTime",studyTimeRoute)
app.use("/api/subscribers",subscribersRoute)

app.use('/uploads', express.static('uploads'))
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Thư mục lưu trữ file
  },
  filename: function (req, file, cb) {
    
    const originalname = file.originalname;
    const extension = path.extname(originalname); // Lấy đuôi của tệp

    // Tạo tên tệp với đuôi
    const newFileName = Date.now() + '-' + originalname+extension;

    cb(null, newFileName); // Tên file lưu trữ  
  },
});

const upload = multer({ storage: storage });


// app.use("/v1/user", userRoute);
app.get("/", (req, res) => {
  res.json({ message: "Welcome connect to server." });
});
app.listen(3000, () => {
  console.log("Server is running");
});

// Dữ liệu giả định
// const training_data = [
//   { thu: 2, begin: '13:00', end: '14:00', class: 'A1' },
//   { thu: 5, begin: '13:00', end: '14:00', class: 'A1' },
//   { thu: 3, begin: '10:00', end: '12:00', class: 'A2' },
//   { thu: 4, begin: '09:00', end: '14:00', class: 'A2' },
//   { thu: 4, begin: '19:00', end: '21:00', class: 'A3' },
//   { thu: 7, begin: '15:00', end: '18:00', class: 'A3' },
//   // Thêm dữ liệu khác tại đây
// ];
// // Hàm chuyển đổi thời gian từ chuỗi thành số nguyên (số phút)
// function convertTimeToMinutes(timeString) {
//   const [hours, minutes] = timeString.split(':').map(Number);
//   return hours * 60 + minutes;
// }

// const trainingData = training_data.map((item) => {
//   return [
//     item.thu,
//     convertTimeToMinutes(item.begin),
//     convertTimeToMinutes(item.end),
//   ];
// });

// const { exec, spawn } = require('child_process');
// // const trainingData = [
// //   [13, 14],
// //   [13, 14],
// //   [10, 12],
// //   [9, 14],
// //   [19, 21],
// //   [15, 18],
// // ];
// var lable =training_data.map((item) => {
  
//   return  item.class
  
// });
// const choose = [[2,convertTimeToMinutes('17:32'), convertTimeToMinutes('19:00')]]
// // Chuyển đổi dữ liệu huấn luyện thành chuỗi JSON
// const inputJSON = JSON.stringify(trainingData);
// const inputJSON2 = JSON.stringify(lable);
// const inputJSON3 = JSON.stringify(choose);

// // Tạo một tiến trình Python và truyền dữ liệu qua tham số dòng lệnh
// const pythonProcess = spawn('python', ['decision_tree.py', inputJSON, inputJSON2, inputJSON3]);
// pythonProcess.stdout.on('data', (data) => {
//   const result = data.toString();
//   console.log(`Kết quả từ Python: ${result}`);
// });


// Lệnh để chạy tệp Python
// const pythonCommand = 'python decision_tree.py';

// exec(pythonCommand, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Lỗi: ${error}`);
//     return;
//   }
//   console.log(`Lớp học được chọn: ${stdout}`);
// });
