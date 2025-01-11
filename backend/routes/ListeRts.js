
const express = require('express');
const router = express.Router();
const ListeCtrls = require('../controllers/ListeCtrls');

// Créer une liste
router.post('/create', ListeCtrls.createListe);

// Obtenir toutes les listes
router.get('/getAll', ListeCtrls.getAllListes);

// Obtenir une liste par ID
router.get('/getOne/:listeId', ListeCtrls.getListeById);

// Mettre à jour la présence d'un étudiant dans une liste pour une séance donnée
router.put('/upd/:seanceId/:etudiantId/presence', ListeCtrls.updatePresence);

// Supprimer toutes les listes
router.delete('/deleteAll', ListeCtrls.deleteAllListes);

router.get('/absencesByFiliere', ListeCtrls.getAbsencesByFiliere);
router.get('/absencesByFiliereBySem/:sem', ListeCtrls.getAbsencesByFiliereBySem);
router.get('/absence-percentage', ListeCtrls.getAbsencePercentage);


module.exports = router;


/*const express = require('express');
const router = express.Router();
const ListeCtrls = require('../controllers/ListeCtrls');

// Créer une liste
router.post('/listes', ListeCtrls.createListe);

// Obtenir toutes les listes
router.get('/listes', ListeCtrls.getAllListes);

// Obtenir une liste par ID
router.get('/listes/:listeId', ListeCtrls.getListeById);


// Mettre à jour la présence d'un étudiant dans une liste pour une séance donnée
router.put('/listes/seances/:seanceId/etudiants/:etudiantId', ListeCtrls.updatePresence);

module.exports = router;
*/