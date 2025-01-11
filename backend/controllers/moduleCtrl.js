const Module=require('../models/Modules.js');

const Element = require('../models/Elements.js');

const Semestre=require('../models/Semestres.js');


exports.CreatModule = (req, res) => {

    Module.findOne({ lebelle_module: req.body.lebelle_module, semestre: req.body.semestre })
        .then((existingModule) => {
            if (existingModule) {
                return res.status(400).json({ message: "A module with the same name and semester already exists" });
            }

            Semestre.findOne({ _id: req.body.semestre })
                .then((semestre) => {
                    if (!semestre) {
                        return res.status(404).json({ message: "Semestre not found" });
                    }
                    
                    const module = new Module({
                        ...req.body,
                        semestre: semestre._id 
                    });
                    console.log(module)

                    module.save()
                        .then((module) => {
                            semestre.module.push(module._id); 
                            semestre.save()
                                .then(() => {
                                    res.status(201).json({ message: "Module created successfully" });
                                })
                                .catch(error => {
                                    res.status(400).json({ error });
                                });
                        })
                        .catch(error => {
                            res.status(400).json({ error });
                        });
                })
                .catch(error => {
                    res.status(404).json({ error });
                });
        })
        .catch(error => {
            res.status(500).json({ error });
        });
}


/*exports.GetModules = (req, res) => {
    Module.find() 
         
        .populate({ path: 'semestre', select: "lebelle_semestre" }) 
        .then((module) => {
            if (!module || module.length === 0) {
                return res.status(404).json({ error: "No modules found" });
            }
            res.status(200).json(modules);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};  */

// exports.GetModuleById = (req, res) => {
//     const moduleId = req.params.moduleId; 

//     Module.findById(moduleId)
//     .populate({path:'elements', select :"libelle"}) 
//     .populate({path:'semestre', select :"lebelle_semestre"}) 
//         .then((module) => {
//             if (!module) {
//                 return res.status(404).json({ error: "Module not found" });
//             }
//             res.status(200).json(module);
//         })
//         .catch((error) => {
            
//             res.status(500).json({ error});
//         });
// };

exports.GetModuleById = (req, res) => {
    const moduleId = req.params.moduleId;

    Module.findById(moduleId)
        .populate([
            { path: "elements" },
            { path: "semestre" }
        ])
        .then((module) => {
            if (!module) {
                return res.status(404).json({ error: "Module not found" });
            }

            const modulepopulate = {
                _id: module._id,
                libelleModule: module.libelleModule
            };
            if (module.elements) {
                modulepopulate.elements = module.elements
            }
            if (module.semestre) {
                modulepopulate.semestre = module.semestre;
            }

            res.status(200).json(modulepopulate);
        })
        .catch((error) => {
            console.error("Error fetching module:", error);
            res.status(500).json({ error: "An error occurred while fetching module" });
        });
};


exports.UpdateModule = (req, res) => {
    const moduleId = req.params.moduleId;
    const updateModule = req.body;

    Module.findByIdAndUpdate(moduleId, updateModule, { new: true })
        .then((updatedModule) => {
            if (!updatedModule) {
                return res.status(404).json({ message: "Module not found" });
            }
            res.status(200).json({ message: "Module updated successfully", updatedModule });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};


exports.DeleteModule = async (req, res) => {
    try {
        const moduleId = req.params.moduleId;
        await Element.updateMany({ module: moduleId }, { $unset: { module: 1 } });

 
        await Semestre.updateMany({ module: moduleId }, { $unset: { module: 1 } });

        const deletedModule = await Module.findByIdAndDelete(moduleId);

        if (!deletedModule) {
            return res.status(404).json({ message: "Module not found" });
        }
        
        res.status(200).json({ message: "Module deleted successfully and module reference removed from related elements and semestres" });
    } catch (error) {
        res.status(500).json({ error });
    }
};
  


// exports.GetModules = (req, res) => {
//     Module.find() 
//         .populate({ path: 'semestre', select: "lebelle_semestre" }) 
//         .populate({path:'elements', select :"libelle"})
//         .then((module) => {
//             console.log("Modules:", module); // Ajoutez cette ligne pour afficher les modules récupérés
//             if (!module || module.length === 0) {
//                 return res.status(404).json({ error: "No modules found" });
//             }
//             res.status(200).json(module);
//         })
//         .catch((error) => {
//             console.error("Error:", error); // Ajoutez cette ligne pour afficher toute erreur survenue
//             res.status(500).json({ error });
//         });
// };
exports.GetModules = (req, res) => {
    Module.find()
        .populate([
             { path: 'semestre', select: 'nomSemestre' },
              { path: 'elements', select: 'libelleElement description seances professeurs filieres semestre' }
         ])
        .then((modules) => {
            console.log("Modules:", modules); 
            if (!modules || modules.length === 0) {
                return res.status(404).json({ error: "No modules found" });
            }

            const modulesPopulate = modules.map(module => {
                const modulePopulate = {
                    _id: module._id,
                    lebelle_module: module.lebelle_module
                };
        
                if (module.elements && module.elements.length > 0) {
                    modulePopulate.elements = module.elements;
                }

                if (module.semestre) {
                    modulePopulate.semestre = module.semestre;
                }

                return modulePopulate;
            });

            res.status(200).json(modulesPopulate);
        })
        .catch((error) => {
            console.error("Error:", error); 
            res.status(500).json({ error });
        });
};