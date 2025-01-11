const Elements = require('../models/Elements');
const Seances = require('../models/Seances');
const  Professeurs = require('../models/Professeurs');
const Student = require('../models/Students'); // Importez le modèle Student


// exports.createSeance = (req, res) => {
//     Elements.findOne({ libelleElement: req.body.libelleElement })
//         .then((element) => {
//             if (!element) {
//                 return res.status(404).json({ message: "Element not found" }); 
//             }
//             const seance = new Seances({
//                 ...req.body,
//                 element: element._id
//             });
//             seance.save()
//                 .then(() => {
//                     element.seances.push(seance._id);
//                     element.save()
//                         .then(() => {
//                             res.status(201).json({ message: "Seance créée avec succès" }); // Envoi de la réponse uniquement après avoir terminé toutes les opérations
//                         })
//                         .catch(error => {
//                             res.status(400).json({ error });
//                         });
//                 })
//                 .catch(error => {
//                     res.status(400).json({ error });
//                 });
//         })
//         .catch(error => {
//             res.status(404).json({ error });
//         });
// }
// exports.createSeance = async (req, res) => {
//     try {
//         // Rechercher l'élément correspondant à partir du libellé fourni
//         const element = await Elements.findOne({ libelleElement: req.body.libelleElement });
//         if (!element) {
//             return res.status(404).json({ message: "Element not found" });
//         }

//         // Rechercher le professeur correspondant à partir du nom et prénom fournis
//         const professeur = await Professeurs.findOne({ nom: req.body.nom, prenom: req.body.prenom });
//         if (!professeur) {
//             return res.status(404).json({ message: "Professeur not found" });
//         }

       

//         // Créer une nouvelle séance avec les données fournies
//         const seance = new Seances({
//             ...req.body,
//             element: element._id,
//             professeur: professeur._id,
           
//         });

//         // Enregistrer la nouvelle séance dans la base de données
//         await seance.save();

//         // Ajouter l'ID de la séance à la liste des séances de l'élément
//         element.seances.push(seance._id);
//         await element.save();

//         // Ajouter l'ID de la séance à la liste des séances du professeur
//         professeur.seances.push(seance._id);
//         await professeur.save();

       

//         res.status(201).json({ message: "Seance créée avec succès" });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// };
exports.createSeance = async (req, res) => {
    try {
        // Rechercher l'élément correspondant à partir du libellé fourni
        const element = await Elements.findOne({ libelleElement: req.body.libelleElement });
        if (!element) {
            return res.status(404).json({ message: "Element not found" });
        }

        // Rechercher le professeur correspondant à partir du nom et prénom fournis
        const professeur = await Professeurs.findOne({ nom: req.body.nom, prenom: req.body.prenom });
        if (!professeur) {
            return res.status(404).json({ message: "Professeur not found" });
        }

        // Rechercher les étudiants correspondant à partir des identifiants fournis
        const etudiants = await Student.find({ _id: { $in: req.body.etudiants } });
        if (!etudiants || etudiants.length === 0) {
            return res.status(404).json({ message: "No students found" });
        }

        // Créer une nouvelle séance avec les données fournies
        const seance = new Seances({
            ...req.body,
            element: element._id,
            professeur: professeur._id,
            etudiants: etudiants.map(student => student._id), // Ajouter les ID des étudiants à la séance
        });

        // Enregistrer la nouvelle séance dans la base de données
        await seance.save();

        // Ajouter l'ID de la séance à la liste des séances de l'élément
        element.seances.push(seance._id);
        await element.save();

        // Ajouter l'ID de la séance à la liste des séances du professeur
        professeur.seances.push(seance._id);
        await professeur.save();



        res.status(201).json({ message: "Seance créée avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



exports.getAllSeances = (req, res) => {
    Seances.find()
        .populate([
            { path: 'professeur' },
            { path: 'element'}, 
            { path: 'etudiants'}
        ])
        .then(seances => {
            const populatedSeances = seances.map(seance => {
                const populatedFields = {};

               
                populatedFields._id = seance._id;
                populatedFields.jour = seance.jour;
                populatedFields.heureDebut = seance.heureDebut;
                populatedFields.heureFin = seance.heureFin;
                populatedFields.semaine = seance.semaine;
                populatedFields.salle=seance.salle;
                populatedFields.etudiants=seance.etudiants;
             
                
                if (seance.professeur) {
                    populatedFields.professeur = seance.professeur;
                }
                if (seance.element) {
                    populatedFields.element = seance.element;
                }

                return populatedFields;
            });

            res.status(200).json(populatedSeances);
        })
        .catch(error => { res.status(400).json({ error }) });
};


exports.getSeance = async (req, res) => {
    try {
        const seanceInstance = await Seances.findById(req.params.id)
        .populate({
            path: 'etudiants',
            select: 'nom prenom cne'
        }) 
        .populate({
            path: 'element',
            populate: {
                path: 'semestre',
                model: 'Semestres',
                select: 'nomSemestre'
            }
        });

        if (!seanceInstance) {
            return res.status(404).json({ success: false, message: 'prof not found' });
        }

        res.status(200).json({ success: true, seanceInstance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.updateSeance = async (req, res) => {
    try {
        // Rechercher l'élément correspondant à partir du libellé fourni
        const element = await Elements.findOne({ libelleElement: req.body.libelleElement });
        if (!element) {
            return res.status(404).json({ message: "Element not found" });
        }

        // Rechercher le professeur correspondant à partir du nom et prénom fournis
        const professeur = await Professeurs.findOne({ nom: req.body.nom, prenom: req.body.prenom });
        if (!professeur) {
            return res.status(404).json({ message: "Professeur not found" });
        }

        // Mettre à jour la séance avec les données fournies
        await Seances.updateOne({ _id: req.params.id }, {
            ...req.body,
            element: element._id,
            professeur: professeur._id,
            _id: req.params.id
        });

        res.status(200).json({ message: "Seance mise à jour avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// exports.deleteSeance = (req, res) => {
//     const seanceId = req.params.id;
//     console.log(seanceId)

//     Seances.findByIdAndDelete(seanceId)
//         .then(deletedSeance => {
//             if (!deletedSeance) {
//                 return res.status(404).json({ message: "Séance non trouvée" });
//             }

//             const promises = [];

//              promises.push(Professeurs.updateMany({ seance: seanceId }, { $unset: { seance: 1 } }));
//             promises.push(Elements.updateMany({ seance: seanceId }, { $unset: { seance: 1 } }));

//             return Promise.all(promises)
//                 .then(() => {
//                     res.status(200).json({ message: "Séance supprimée avec succès" });
//                 })
//                 .catch(error => {
//                     throw error;
//                 });
//         })
//         .catch(error => {
//             res.status(500).json({ error });
//         });
// };
exports.deleteSeance = (req, res) => {
    const seanceId = req.params.id;

    Seances.findByIdAndDelete(seanceId)
        .then(deletedSeance => {
            if (!deletedSeance) {
                return res.status(404).json({ message: "Séance non trouvée" });
            }

            const promises = [];

            // Supprimer les références de la séance dans la collection Professeurs
            promises.push(Professeurs.updateMany({ seance: seanceId }, { $unset: { seance: 1 } }));

            // Supprimer les références de la séance dans la collection Elements
            promises.push(Elements.updateMany({ seance: seanceId }, { $unset: { seance: 1 } }));

            // Supprimer les références de la séance dans la collection Etudiants

            return Promise.all(promises)
                .then(() => {
                    res.status(200).json({ message: "Séance supprimée avec succès" });
                })
                .catch(error => {
                    throw error;
                });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};

exports.deleteAllSeances = async (req, res) => {
    try {

        const allSeances = await Seances.find({});


        for (const seance of allSeances) {
  
            await Professeurs.updateMany({}, { $pull: { seances: seance._id } });

            await Elements.updateMany({}, { $pull: { seances: seance._id } });
        }

        
        await Seances.deleteMany({});

        res.status(200).json({ message: "Toutes les séances ont été supprimées avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression des séances", error: error.message });
    }
}

exports.getSeancesAujourdhui = async (req, res) => {
    try {
        // Récupérer le jour d'aujourd'hui sous forme de chaîne de caractères
        const joursDeLaSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const dateAujourdhui = new Date();
        const jourAujourdhui = joursDeLaSemaine[dateAujourdhui.getDay()]; // Obtenez le jour de la semaine (par exemple, "Lundi")

        // Trouver les séances pour le jour d'aujourd'hui
        const seancesAujourdhui = await Seances.find({ jour: jourAujourdhui })
            .populate('professeur')
            .populate('element');

        res.status(200).json(seancesAujourdhui);
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des séances d'aujourd'hui", error: error.message });
    }
};

exports.getSeancesAujourdhuiByProfesseur = async (req, res) => {
    try {
        // Récupérer le jour d'aujourd'hui sous forme de chaîne de caractères
        const joursDeLaSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const dateAujourdhui = new Date();
        const jourAujourdhui = joursDeLaSemaine[dateAujourdhui.getDay()]; // Obtenez le jour de la semaine (par exemple, "Lundi")

        // Récupérer l'ID du professeur depuis les paramètres de la requête
        const professeurId = req.params.professeurId;

        // Trouver les séances pour le jour d'aujourd'hui et le professeur spécifique
        const seancesAujourdhuiProfesseur = await Seances.find({ jour: jourAujourdhui, 'professeur': professeurId })
            .populate('professeur')
            .populate('element');

        res.status(200).json(seancesAujourdhuiProfesseur);
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des séances d'aujourd'hui pour ce professeur", error: error.message });
    }
};


exports.getSeancesAujourdhuiEtudiant = async (req, res) => {
    try {
        // Récupérer le jour d'aujourd'hui sous forme de chaîne de caractères
        const joursDeLaSemaine = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
        const dateAujourdhui = new Date();
        const jourAujourdhui = joursDeLaSemaine[dateAujourdhui.getDay()]; // Obtenez le jour de la semaine (par exemple, "Lundi")

        // Récupérer l'ID de l'étudiant depuis les paramètres de la requête
        const etudiantId = req.params.etudiantId;

        // Rechercher l'étudiant par son ID
        const etudiant = await Student.findById(etudiantId);
        if (!etudiant) {
            return res.status(404).json({ message: "Étudiant non trouvé" });
        }

        // Trouver les éléments de l'étudiant
        const elementsEtudiant = await Elements.find({ filieres: etudiant.filieres, semestre: etudiant.semestre });

        // Récupérer les séances pour les éléments de l'étudiant pour aujourd'hui
        const seancesAujourdhuiEtudiant = await Seances.find({ jour: jourAujourdhui, element: { $in: elementsEtudiant.map(element => element._id) } })
            .populate('element')
            .populate('professeur');

        res.status(200).json(seancesAujourdhuiEtudiant);
    } catch (error) {
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des séances d'aujourd'hui pour cet étudiant", error: error.message });
    }
};
