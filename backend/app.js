const express=require('express');
require('dotenv').config();
var cors = require('cors')
const app=express();
const mongoose=require('mongoose');
const seanceRouter=require('./routes/SeancesRts');
const studentRouter=require('./routes/StudentsRts');
const semestreRouter=require('./routes/SemestreRts');
const profsRouter=require('./routes/ProfesseursRts');
const filiereRts=require('./routes/FiliereRts');
const elementRts=require('./routes/elementRts');
const usersRts = require('./routes/usersRts');
const QrCodeRts=require('./routes/QrcodeRts');
const ListeRts=require('./routes/ListeRts');
const ModuleRts=require('./routes/moduleRts');
const UserRts=require('./routes/usersRts')


app.use(cors())

app.use(express.json());




mongoose.connect(process.env.DBURI)
.then(()=>{console.log('connexion reussi !!!!')})
.catch((error)=>{console.log(error)});

app.use('/api1/v1/seances',seanceRouter);
app.use('/api1/v1/students',studentRouter);
app.use('/api1/v1/semestre',semestreRouter);
app.use('/api1/v1/professeurs',profsRouter);
app.use('/api1/v1/filieres',filiereRts);
app.use('/api1/v1/elements',elementRts);
app.use('/api1/v1/auth',usersRts);
app.use('/api1/v1/Qr',QrCodeRts);
app.use('/api1/v1/liste',ListeRts);
app.use('/api1/v1/modules',ModuleRts);
app.use('/api1/v1/users',UserRts);







module.exports=app;