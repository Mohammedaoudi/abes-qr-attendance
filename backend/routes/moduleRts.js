const express = require('express');
const router = express.Router();
const moduleCtrl = require('../controllers/moduleCtrl');


router.post('/createModule', moduleCtrl.CreatModule);

router.get('/showALL', moduleCtrl.GetModules);

router.get('/showModule/:moduleId', moduleCtrl.GetModuleById);

router.delete('/deleteModule/:moduleId', moduleCtrl.DeleteModule);

router.put('/updateModule/:moduleId', moduleCtrl.UpdateModule);


module.exports = router;