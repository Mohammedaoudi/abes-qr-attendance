const express = require('express');
const Router = express.Router();
const StudentCtrls = require('../controllers/StudentsCtrls');
const multer = require('multer');
const path = require('path');

Router.get('/count', StudentCtrls.countStudents);
Router.post('/createstudent', StudentCtrls.createStudent);
Router.get('/getStudents', StudentCtrls.getAllStudents);
Router.get('/getStudent/:id', StudentCtrls.getStudent);
Router.delete('/deleteAllStudents', StudentCtrls.deleteAllStudents);
Router.delete('/deleteStudent/:id', StudentCtrls.deleteStudent);
Router.put('/updateStudent/:id', StudentCtrls.updateStudent);
Router.get('/filiere/:filiereId/element/:elementName', StudentCtrls.getStudentsByElementName);

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename:(req, file, cb)=>{
        cb(null,file.originalname)
    }
})

var upload = multer({storage:storage})


Router.post('/import', upload.single('file'), StudentCtrls.importStud);



module.exports = Router;
