/*const Liste = require('../models/Liste');

// Créer une liste
exports.createListe = async (req, res) => {
    try {
        const { students, seanceId, profId } = req.body;
        const liste = new Liste({
            students,
            seance: seanceId,
            prof: profId
        });
        const savedListe = await liste.save();
        res.status(201).json(savedListe);
    } catch (error) {
        console.error('Erreur lors de la création de la liste :', error);
        res.status(500).json({ error: 'Erreur lors de la création de la liste' });
    }
};

// Obtenir toutes les listes
exports.getAllListes = async (req, res) => {
    try {
        const listes = await Liste.find();
        res.json(listes);
    } catch (error) {
        console.error('Erreur lors de la récupération des listes :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des listes' });
    }
};

// Obtenir une liste par ID
exports.getListeById = async (req, res) => {
    try {
        const liste = await Liste.findById(req.params.listeId);
        if (!liste) {
            return res.status(404).json({ error: 'Liste non trouvée' });
        }
        res.json(liste);
    } catch (error) {
        console.error('Erreur lors de la récupération de la liste :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la liste' });
    }
};



// Mettre à jour la présence d'un étudiant dans une liste pour une séance donnée
exports.updatePresence = async (req, res) => {
    try {
        const { etudiantId, seanceId } = req.params;

        // Rechercher la liste correspondante à la séance donnée
        const liste = await Liste.findOne({ seance: seanceId });
        if (!liste) {
            return res.status(404).json({ error: 'Liste non trouvée pour cette séance' });
        }

        // Mettre à jour la présence de l'étudiant dans la liste
        const studentIndex = liste.students.findIndex(student => student.eleve.toString() === etudiantId);
        if (studentIndex === -1) {
            return res.status(404).json({ error: 'Étudiant non trouvé dans la liste' });
        }

        liste.students[studentIndex].absence = true; // Modifier l'absence à true
        await liste.save();

        res.json(liste);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la présence de l\'étudiant dans la liste :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la présence de l\'étudiant dans la liste' });
    }
};
*/
const Liste = require('../models/Liste');
const Student= require('../models/Students')
const Element = require('../models/Elements')
const Seance = require('../models/Seances')
const Filiere = require('../models/Filieres')


// Créer une liste
exports.createListe = async (req, res) => {
    try {
        const { students, seance, prof } = req.body;
        const liste = new Liste({
            students,
            seance,
            prof
        });
        const savedListe = await liste.save();
        res.status(201).json(savedListe);
    } catch (error) {
        console.error('Erreur lors de la création de la liste :', error);
        res.status(500).json({ error: 'Erreur lors de la création de la liste' });
    }
};

// Obtenir toutes les listes
exports.getAllListes = async (req, res) => {
    try {
      

        const listes = await Liste.find();
        res.json(listes);
    } catch (error) {
        console.error('Erreur lors de la récupération des listes :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des listes' });
    }
};

// Obtenir une liste par ID
exports.getListeById = async (req, res) => {
    try {
        const liste = await Liste.findById(req.params.listeId);
        if (!liste) {
            return res.status(404).json({ error: 'Liste non trouvée' });
        }
        res.json(liste);
    } catch (error) {
        console.error('Erreur lors de la récupération de la liste :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la liste' });
    }
};

// Mettre à jour la présence d'un étudiant dans une liste pour une séance donnée
exports.updatePresence = async (req, res) => {
    try {
        const { etudiantId, seanceId } = req.params;

        // Rechercher la liste correspondante à la séance donnée
        const liste = await Liste.findOne({ seance: seanceId });
        if (!liste) {
            return res.status(404).json({ error: 'Liste non trouvée pour cette séance' });
        }

        // Mettre à jour la présence de l'étudiant dans la liste
        const studentIndex = liste.students.findIndex(student => student.eleve.toString() === etudiantId);
        if (studentIndex === -1) {
            return res.status(404).json({ error: 'Étudiant non trouvé dans la liste' });
        }

        liste.students[studentIndex].absence = false; // Modifier l'absence à true
        await liste.save();

        res.json(liste);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la présence de l\'étudiant dans la liste :', error);
        res.status(500).json({ error: 'Erreur lors de la mise à jour de la présence de l\'étudiant dans la liste' });
    }
};

exports.deleteAllListes = async (req, res) => {
    try {
        await Liste.deleteMany({});
        res.status(204).json({ message: 'Toutes les listes ont été supprimées avec succès' });
    } catch (error) {
        console.error('Erreur lors de la suppression de toutes les listes :', error);
        res.status(500).json({ error: 'Erreur lors de la suppression de toutes les listes' });
    }
};


// Function to count absences per Filiere
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

exports.getAbsencesByFiliere = async (req, res) => {
    try {
        const elements = await Element.find().populate('filieres');
        let absenceCount = [];
        console.log('hhhhhhhhh',elements)

        for (let element of elements) {
            // Initialize an array to hold absences for each month
            let monthlyAbsences = Array(12).fill(0);

            // Find all seances related to the element
            const seances = await Seance.find({ element: element._id });
console.log('hhhhhhhhh',elements)
            for (let seance of seances) {
                // Find all listes related to the seance
                const listes = await Liste.find({ seance: seance._id });
                console.log('hhhhhfffffhhhh',listes)

                for (let liste of listes) {
                    console.log('Processing liste:', liste._id);

                    for (let student of liste.students) {

                        if (student.absence) {
                            const month = new Date(liste.createdDate).getMonth();
                            monthlyAbsences[month]++;
                        }
                    }
                }
            }

            // Create an object for monthly absences
            let monthlyAbsenceData = {};
            for (let i = 0; i < months.length; i++) {
                monthlyAbsenceData[months[i]] = monthlyAbsences[i];
            }

            absenceCount.push({
                filiere: element.filieres.shortNom,
                absences: monthlyAbsenceData
            });
        }


        res.status(200).json(absenceCount);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
};




exports.getAbsencesByFiliereBySem = async (req, res) => {
    try {
        const { sem } = req.params; // Get the semester number from the URL parameters
        const elements = await Element.find().populate('filieres').populate('semestre');

        // Filter elements based on the semester number
        const filteredElements = elements.filter(element => element.semestre.nomSemestre.startsWith(sem));

        let absenceCount = [];

        for (let element of filteredElements) {
            // Initialize an array to hold absences for each month
            let monthlyAbsences = Array(12).fill(0);

            // Find all seances related to the element
            const seances = await Seance.find({ element: element._id });

            for (let seance of seances) {
                // Find all listes related to the seance
                const listes = await Liste.find({ seance: seance._id });

                for (let liste of listes) {
                    for (let student of liste.students) {
                        if (student.absence) {
                            const month = new Date(liste.createdDate).getMonth();
                            monthlyAbsences[month]++;
                        }
                    }
                }
            }

            // Create an object for monthly absences
            let monthlyAbsenceData = {};
            for (let i = 0; i < months.length; i++) {
                monthlyAbsenceData[months[i]] = monthlyAbsences[i];
            }

            absenceCount.push({
                filiere: element.filieres.shortNom,
                absences: monthlyAbsenceData
            });
        }

        res.status(200).json(absenceCount);
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
};

exports.getAbsencePercentage = async (req, res) => {
    try {
        const listes = await Liste.find();
        
        let totalStudents = 0;
        let totalAbsences = 0;

        listes.forEach(liste => {
            liste.students.forEach(student => {
                totalStudents++;
                if (student.absence) {
                    totalAbsences++;
                }
            });
        });

        const absencePercentage = totalStudents > 0 ? (totalAbsences / totalStudents) * 100 : 0;

        res.status(200).json({ absencePercentage: absencePercentage.toFixed(2) }); // Formatage à deux décimales
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ error: err.message });
    }
};

