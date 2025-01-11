const express=require('express');
const Router=express.Router();
const FiliereCtrls=require('../controllers/FiliereCtrls');


Router.post('/create',FiliereCtrls.createFiliere)
Router.get('/getAll',FiliereCtrls.getAllFiliere);
Router.get('/getOne/:name', FiliereCtrls.getFiliere);
Router.delete('/deleteAll',);
Router.delete('/deleteOne/:id',);
Router.put('/update/:id',);


Router.get('/getOnebyId/:id', FiliereCtrls.getFiliereById);


module.exports=Router;