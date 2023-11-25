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
const selectClass=require("./routes/selectClass_decisionTree_Route");
const vnpay = require('./routes/vnpay')
// const userRoute = require("./routes/user");
dotenv.config();

//ROUTES
app.use("/api/selectClass",selectClass)
app.use("/api/vnpay", vnpay);
app.use("/api/auth", authRoute);
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
// app.use("/v1/user", userRoute);
app.get("/", (req, res) => {
  res.json({ message: "Welcome connect to server." });
});
app.listen(3000, () => {
  console.log("Server is running");
});

const knex = require('knex')(require('./database/dbConnect'));
knex
  .select( 'subscribers.name', 'class.name as className','courses.name as CN')
  .from('subscribers')
  .innerJoin('registration_information', 'subscribers.id','registration_information.subscribers_id')
  .count('registration_information.subscribers_id as DK')
  .sum('registration_information.fees_calculated as totalAmount')
  .groupBy('subscribers.name').having('totalAmount', '>=', 1200788,'AND','totalAmount', '<', 5600000)
  .innerJoin('class', 'registration_information.class_id', 'class.id')
  .innerJoin('courses', 'class.courses_id', 'courses.id')
  .then(rows => {
    console.log(rows);
  })
  .catch(err => {
    console.error(err);
  })

  knex
  .select(  'class.name as className','study_time.thu')
  .from('class')
  .leftJoin('class_studytime', 'class_studytime.class_id', 'class.id')
  .leftJoin('study_time', 'class_studytime.studyTime_id ', 'study_time.id')
  .then(rows => {
    console.log(rows);
  })
  .catch(err => {
    console.error(err);
  })

knex('class')
  .select('class.name','class.id')
  .join('registration_information', 'class.id', '=', 'registration_information.class_id')
  .distinct('class.name')
  .then(rows => {
    console.log(rows);
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    knex.destroy();
  });

//tạo bảng
// knex.schema
//   .createTable('a1', table => {
//     table.increments('id').primary(); // Tạo cột id là khóa chính tự tăng
//     table.string('username');
//   })
//   .then(() => {
    
//   })
//   .then(() => {
//     console.log('Bảng và khóa ngoại đã được tạo thành công');
//   })
//   .catch(error => {
//     console.error('Lỗi khi tạo bảng và khóa ngoại:', error);
//   })

// knex.schema.createTable('b1', table => {
//   table.increments('id').primary();
//   table.string('title');
//   table.text('content');
//   table.integer('user_id').unsigned(); // Tạo cột user_id để làm khóa ngoại
//   table.foreign('user_id').references('a1.id').onDelete('CASCADE'); // Khai báo khóa ngoại
// }) .then(() => {
//       console.log('Bảng và khóa ngoại đã được tạo thành công');
//     })
//     .catch(error => {
//       console.error('Lỗi khi tạo bảng và khóa ngoại:', error);
//     })

//OOP
//Đây là lớp cha
class Person {
  constructor(name, age) {
      this.name= name;
      this.age= age;
  }
  show() {
     return `Tối tên là: ${this.name}, ${this.age} tuổi`;
  }
}    
//Đây là lớp con
class Student extends Person {
   constructor(idSV, name, age) {
       super(name,age);
       this.idSV = idSV;
   }
   get getName() {
    return this.name;
}
   show() {
      return `Mã SV: ${this.idSV}` + super.show();
   }
}
let a=new Student(3,'a',23)
console.log(a.getName);
// const connection = require('./database/dbConnect_Sequelize')
// connection()

// Dữ liệu giả định
const training_data = [
  {  startTime: '07:00:', endTime: '09:00' ,id:1},
  {  startTime: '07:00:', endTime: '09:00', id:1},
 
  {  startTime: '19:30', endTime: '21:00' ,id:3},
  {  startTime: '19:30', endTime: '21:00' ,id:3},
  // Thêm dữ liệu khác tại đây
];
// Hàm chuyển đổi thời gian từ chuỗi thành số nguyên (số phút)
function convertTimeToMinutes(timeString) {
  const [hours, minutes] = timeString.split(':').map(Number);
  return hours * 60 + minutes;
}

const trainingData = training_data.map((item) => {
  return [
    // item.id,
    convertTimeToMinutes(item.startTime),
    convertTimeToMinutes(item.endTime),
  ];
});
console.log(trainingData);
const { exec, spawn } = require('child_process');
var lable =training_data.map((item) => {
  
  return  item.id
  
});
const choose = [[convertTimeToMinutes('05:00'), convertTimeToMinutes('08:00')]]
console.log(lable);
// Chuyển đổi dữ liệu huấn luyện thành chuỗi JSON
const inputJSON = JSON.stringify(trainingData);
const inputJSON2 = JSON.stringify(lable);
const inputJSON3 = JSON.stringify(choose);
// Tạo một tiến trình Python và truyền dữ liệu qua tham số dòng lệnh
const pythonProcess = spawn('python', ['decision_tree.py', inputJSON, inputJSON2, inputJSON3]);
pythonProcess.stdout.on('data', (data) => {
  const result = data.toString();
  console.log(`Kết quả từ Python: ${result}`);
});


// Lệnh để chạy tệp Python
// const pythonCommand = 'python decision_tree.py';

// exec(pythonCommand, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Lỗi: ${error}`);
//     return;
//   }
//   console.log(`Lớp học được chọn: ${stdout}`);
// });
