const express=require('express')
const router=express.Router()
const semesCtrl=require('../controllers/semestreCtrl');

router.post('/createsemestre',semesCtrl.createSemestre)

router.get('/showsemester',semesCtrl.GetSemestre)

router.get('/showsemester/:id',semesCtrl.GetSemestreById)

router.delete('/Deletesemestre/:id',semesCtrl.Deletesemestre)

router.put('/updatesemester/:id',semesCtrl.Updatesemestre)

module.exports=router; 
