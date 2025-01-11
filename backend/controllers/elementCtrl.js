const Element=require('../models/Elements.js');

const Module=require('../models/Modules.js');

const Professeurs=require('../models/Professeurs')
const Filieres=require('../models/Filieres')

const Seances=require('../models/Seances');
const Semestre = require('../models/Semestres.js');


/*

exports.CreateElement = (req, res) => {
    Element.findOne({ libelle: req.body.libelle, module: req.body.module })
        .then((existingElement) => {
            if (existingElement) {
                return res.status(400).json({ message: "An element with the same name and module already exists" });
            }

            Module.findOne({ _id: req.body.module })
                .then((module) => {
                    if (!module) {
                        return res.status(404).json({ message: "Module not found" });
                    }
                    
                    let professeurPromise = Promise.resolve();
                    if (req.body.professeurs) {
                        professeurPromise = Professeur.findOneAndUpdate(
                            { _id: req.body.professeurs },
                            { $push: { elements: Element._id } },
                            { new: true }
                        )
                        .then((updatedProfesseur) => {
                            if (!updatedProfesseur) {
                                return res.status(404).json({ message: "Professeur not found" });
                            }
                        })
                        .catch(error => {
                            return res.status(500).json({ error });
                        });
                    }

                    let filierePromise = Promise.resolve();
                    if (req.body.filieres) {
                        filierePromise = Filiere.findOneAndUpdate(
                            { _id: req.body.filieres },
                            { $push: { elements: Element._id } },
                            { new: true }
                        )
                        .then((updatedFiliere) => {
                            if (!updatedFiliere) {
                                return res.status(404).json({ message: "Filiere not found" });
                            }
                        })
                        .catch(error => {
                            return res.status(500).json({ error });
                        });
                    }

                    Promise.all([professeurPromise, filierePromise])
                        .then(() => {
                            const element = new Element({
                                ...req.body,
                                module: module._id 
                            });

                            element.save()
                                .then((element) => {
                                    module.elements.push(element._id); 
                                    module.save()
                                        .then(() => {
                                            res.status(201).json({ message: "Element created successfully" });
                                        })
                                        .catch(error => {
                                            res.status(400).json({ error });
                                        });
                                })
                                .catch(error => {
                                    res.status(400).json({ error });
                                });
                        });
                })
                .catch(error => {
                    res.status(404).json({ error });
                });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
};
*/



exports.GetElements = (req, res) => {
    Element.find()
        .populate([
            { path: "module" },
            { path: "professeurs" },
            { path: "filieres" },
            { path:"seances"}
        ])
        .then((elements) => {
            const elementspopulate = elements.map(element => {
                const elementpopulate = {
                    _id: element._id,
                    libelleElement: element.libelleElement,
                    description: element.description
                };

                if (element.seances) {
                    elementpopulate.seances = element.seances;
                }

                if (element.professeurs) {
                    elementpopulate.professeurs = element.professeurs;
                }

                if (element.filieres) {
                    elementpopulate.filieres = element.filieres;
                }

                if (element.semestre) {
                    elementpopulate.semestre = element.semestre;
                }
                if (element.module) {
                    elementpopulate.module = element.module;
                }

                return elementpopulate;
            });

            res.status(200).json(elementspopulate);
        })
        .catch((error) => {
            console.error("Error fetching elements:", error);
            res.status(500).json({ error });
        });
};


// exports.GetElementById = (req, res) => {
//     const elementId = req.params.id; 

//     Element.findById(elementId)
//         .populate({path:'seances'}) 
//         .populate({path:'professeurs',select:''}) 
//         .populate({path:'filieres',select:''}) 
//         .populate({path:"module" , select:"lebelle_module"}) 
//         .then((element) => {
//             if (!element) {
//                 return res.status(404).json({ error: "Element not found" });
//             }
//             res.status(200).json(element);
//         })
//         .catch((error) => {
//             console.error("Error fetching element:", error);
//             res.status(500).json({ error: "An error occurred while fetching element" });
//         });
// };
exports.GetElementById = (req, res) => {
    const elementId = req.params.id;

    Element.findById(elementId)
        .populate([
            { path: "module" },
            { path: "professeurs" },
            { path: "filieres" },
            { path: "seances" }
        ])
        .then((element) => {
            if (!element) {
                return res.status(404).json({ error: "Element not found" });
            }

            const elementpopulate = {
                _id: element._id,
                libelleElement: element.libelleElement,
                description: element.description
            };

            if (element.seances && element.seances.length > 0) {
                elementpopulate.seances = element.seances;
            }

            if (element.professeurs && element.professeurs.length > 0) {
                elementpopulate.professeurs = element.professeurs;
            }

            if (element.filieres && element.filieres.length > 0) {
                elementpopulate.filieres = element.filieres;
            }

            if (element.semestre) {
                elementpopulate.semestre = element.semestre;
            }

            res.status(200).json(elementpopulate);
        })
        .catch((error) => {
            console.error("Error fetching element:", error);
            res.status(500).json({ error: "An error occurred while fetching element" });
        });
};




/*exports.Deleteelement = (req, res) => {
    const elementID = req.params.id;

    // Supprimer l'élément principal
    Element.findByIdAndDelete(elementID)
        .then((element) => {
            if (!element) {
                return res.status(404).json({ message: "Element not found" });
            }

            // Retirer l'ID de l'élément du tableau des éléments du module
            if (element.module) {
                return Module.updateOne({ _id: element.module }, { $pull: { elements: elementID } });
            }

            return Promise.resolve(); // Si aucun module n'est associé à l'élément, résoudre la promesse directement
        })
        .then(() => {
            // Réponse si tout s'est bien passé
            res.status(200).json({ message: "Element and associated data deleted successfully" });
        })
        .catch((error) => {
            // Gestion des erreurs
            res.status(500).json({ error: error.message });
        });
};
*/
// exports.Updateelement=(req,res)=>{
//     const elementID=req.params.id;
//     const updateelement=req.body;
//     Element.findByIdAndUpdate(elementID,updateelement,{new:true})
//     .then((updatedElement)=>{
//         if(!updatedElement){
//             return res.status(404).json({ message: "Element not found not found" });
//         }
//     res.status(200).json({message:"Module updated successfully",updatedElement});})
//     .catch((error)=>{
//             res.status(500).json(error);
//         })

//     }

exports.Updateelement = async (req, res) => {
    try {
        const elementID = req.params.id;
        const updateelement = req.body;

        const module = await Module.findOne({ lebelle_module: req.body.module });
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }

        const professeur = await Professeurs.findOne({ nom: req.body.nom, prenom: req.body.prenom });
        if (!professeur) {
            return res.status(404).json({ message: "Professeur not found" });
        }

        const updatedElement = await Element.findByIdAndUpdate(elementID, { ...updateelement, module: module._id, professeurs: professeur._id }, { new: true });

        if (!updatedElement) {
            return res.status(404).json({ message: "Element not found" });
        }

        res.status(200).json({ message: "Element updated successfully", updatedElement });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}






// exports.CreateElement = (req, res) => {
//         Element.findOne({ libelle: req.body.libelle, module: req.body.module })
//             .then((existingElement) => {
//                 if (existingElement) {
//                     return res.status(400).json({ message: "An element with the same name and module already exists" });
//                 }
    
//                 Module.findOne({ _id: req.body.module })
//                     .then((module) => {
//                         if (!module) {
//                             return res.status(404).json({ message: "Module not found" });
//                         }
                        
//                         const element = new Element({
//                             ...req.body,
//                             module: module._id 
//                         });
    
//                         element.save()
//                             .then((element) => {
//                                 module.elements.push(element._id); 
//                                 module.save()
//                                     .then(() => {
//                                         res.status(201).json({ message: "Element created successfully" });
//                                     })
//                                     .catch(error => {
//                                         res.status(400).json({ error });
//                                     });
//                             })
//                             .catch(error => {
//                                 res.status(400).json({ error });
//                             });
//                     })
//                     .catch(error => {
//                         res.status(404).json({ error });
//                     });
//             })
//             .catch(error => {
//                 res.status(500).json({ error });
//             });
//     };
exports.CreateElement = async (req, res) => {
    try {
        const module = await Module.findOne({ lebelle_module: req.body.module });
        if (!module) {
            return res.status(404).json({ message: "Module not found" });
        }
        const professeur = await Professeurs.findOne({ nom: req.body.nom, prenom: req.body.prenom });
        if (!professeur) {
            return res.status(404).json({ message: "Professeur not found" });
        }
        const filiere = await Filieres.findOne({ _id: req.body.filieres }); // Récupérer l'ID de la filière depuis la requête
        if (!filiere) {
            return res.status(404).json({ message: "Filiere not found" });
        }

        const element = new Element({
            ...req.body,
            module: module._id,
            professeurs: professeur._id,
            filieres: filiere._id,
        });

        await element.save();

        module.elements.push(element._id);
        await module.save();
        professeur.elements.push(element._id);
        await professeur.save();
        filiere.elements.push(element._id);
        await filiere.save();


        res.status(201).json({ message: "Element créé avec succès" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.Deleteelement = (req, res) => {
        const elementID = req.params.id;

        Element.findByIdAndDelete(elementID)
            .then((element) => {
                if (!element) {
                    return res.status(404).json({ message: "Element not found" });
                }
    
                const deleteReferences = [];
    
                if (element.module) {
                    deleteReferences.push(Module.updateOne({ _id: element.module }, { $pull: { elements: elementID } }));
                }
    
                if (element.professeurs) {
                    deleteReferences.push(Professeurs.updateOne({ _id: element.professeurs }, { $unset: { elements: 1 } }));
                }
    
                if (element.seances.length > 0) {
                    deleteReferences.push(Seances.deleteMany({ _id: { $in: element.seances } }));
                }
    
                if (element.filieres) {
                    deleteReferences.push(Filieres.updateOne({ _id: element.filieres }, { $unset: { elements: 1 } }));
                }
                if (element.semestre) {
                    deleteReferences.push(Semestre.updateOne({ _id: element.semestre }, { $unset: { elements: "" } }));
                }
                
    
                return Promise.all(deleteReferences);
            })
            .then(() => {
                res.status(200).json({ message: "Element and associated data deleted successfully" });
            })
            .catch((error) => {
                res.status(500).json({ error: error.message });
            });
    };