const express=require('express')
const rout=express.Router()
const elementCtrl=require('../controllers/elementCtrl');


rout.post('/createElement',elementCtrl.CreateElement);


rout.get('/showElements',elementCtrl.GetElements);

rout.get('/showElement/:id',elementCtrl.GetElementById);

rout.delete('/deletelement/:id',elementCtrl.Deleteelement);

rout.put("/updateElement/:id",elementCtrl.Updateelement);

module.exports=rout;