const express=require('express');
const SeancesCtrls=require('../controllers/SeancesCtrls')
const Router=express.Router();


Router.post('/createSeance',SeancesCtrls.createSeance);
Router.get('/getSeances',SeancesCtrls.getAllSeances);
Router.get('/getSeance/=:id',SeancesCtrls.getSeance);
Router.delete('/deleteSeance/=:id',SeancesCtrls.deleteSeance);
Router.delete('/deleteAllSeances',SeancesCtrls.deleteAllSeances);
Router.put('/updateSeance/=:id',SeancesCtrls.updateSeance);
Router.get('/seances-aujourdhui', SeancesCtrls.getSeancesAujourdhui);
// Router.put('/updateProf/:id/Salle',);
// Router.put('/updateSeance/:id/professeur',);
Router.get('/seances-aujourdhui/:professeurId', SeancesCtrls.getSeancesAujourdhuiByProfesseur);
Router.get('/etudiant/:etudiantId/seances-aujourdhui', SeancesCtrls.getSeancesAujourdhuiEtudiant);



module.exports=Router;