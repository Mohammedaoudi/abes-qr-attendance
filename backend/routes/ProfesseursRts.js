const express = require('express');
const Router = express.Router();
const ProfsCtrls = require('../controllers/ProfsCtrls');
const multer = require('multer');
const path = require('path');

// Define storage for uploaded files


// Routes for managing professors
Router.post('/create', ProfsCtrls.createProf);
Router.get('/getAll', ProfsCtrls.getAllProfs);
Router.get('/getOne/:id', ProfsCtrls.getProf);
Router.delete('/deleteAll', ProfsCtrls.deleteAllProfs);
Router.delete('/deleteOne/:id', ProfsCtrls.deleteProf);
Router.put('/update/:id', ProfsCtrls.updateProf);
Router.get('/count', ProfsCtrls.countProfessors);


const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, path.join(__dirname, '../public/uploads'));
    },
    filename:(req, file, cb)=>{
        cb(null,file.originalname)
    }
})

var upload = multer({storage:storage})


Router.post('/import', upload.single('file'), ProfsCtrls.importProfs);

module.exports = Router;
