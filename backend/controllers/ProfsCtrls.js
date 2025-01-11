const Professeurs = require('../models/Professeurs');
const Filiere = require('../models/Filieres');
const seances=require('../models/Seances');
const users = require('../models/Users');
const Element = require('../models/Elements');

const generateDefaultPassword = (name, cin) => {
    const defaultPassword = `@${name.toLowerCase()}@${cin}`;
    return defaultPassword;
};

exports.createProf = async (req, res) => {
    try {
        const { nom, prenom, cin, email, telephone, dateDeNaissance, lieuDeNaissance, adresse, filieres, elements } = req.body;

        const professeur = new Professeurs({
            nom,
            prenom,
            cin,
            email,
            telephone,
            dateDeNaissance,
            lieuDeNaissance,
            adresse,
            filieres: [],
            elements: []
        });

        // Save the professor to the database
        const createdProf = await professeur.save();

        // Generate a default password based on the professor's name and CIN
        const password = generateDefaultPassword(nom, cin);

        // Hash the password
       

        // Create the user
        const user = new users({
            nom,
            prenom,
            email,
            password: password,
            role: 'Professeurs',
            profile: createdProf._id
        });

        // Save the user to the database
        await user.save();

        // Associate the professor with each filiere provided
        if (filieres && filieres.length > 0) {
            for (const filiereId of filieres) {
                // Assuming you have a model called Filiere
                const filiere = await Filiere.findById(filiereId);
                if (!filiere) {
                    return res.status(404).json({ success: false, message: `Filiere with ID ${filiereId} not found` });
                }
                // Add the professor's _id to the professeurs array of the filiere
                filiere.professeurs.push(createdProf._id);
                await filiere.save();
                // Update the filieres array in the professor document
                createdProf.filieres.push(filiere._id);
            }
        }

        if (elements && elements.length > 0) {
            for (const elementId of elements) {
                // Assuming you have a model named Element
                const element = await Element.findById(elementId);
                if (!element) {
                    return res.status(404).json({ success: false, message: `Element with ID ${elementId} not found` });
                }
                // Add the element's _id to the elements array of the professor
                createdProf.elements.push(element._id);
            }
        }

        await createdProf.save();
        res.status(201).json({ success: true, message: "Professor and user created successfully" });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ success: false, error: error.message });
    }
};


exports.getAllProfs = (req, res) => {
    Professeurs.find()
        .populate('elements')
        .populate('seances')
         .populate('filieres')
        .then(profs => {
            const populateProfs=profs.map(prof=>{
                const profpopulate={};
                
                   profpopulate._id=prof._id;
                   profpopulate.nom=prof.nom;
                   profpopulate.prenom=prof.prenom;
                   profpopulate.cin=prof.cin;
                   profpopulate.telephone=prof.telephone;
                   profpopulate.dateDeNaissance=prof.dateDeNaissance;
                   profpopulate.lieuDeNaissance=prof.lieuDeNaissance;
                   profpopulate.adresse=prof.adresse;
                   if(prof.filieres){
                    profpopulate.filieres=prof.filieres;
                   }
                   if(prof.seances){
                    profpopulate.seances=prof.seances;
                   }
                   if(prof.departements){
                    profpopulate.departements=prof.departements;
                   }
                   if(prof.elements){
                    profpopulate.elements=prof.elements;
                   }
                   return profpopulate;


        });


            res.status(200).json(populateProfs);
        })
        .catch(error => { 
            res.status(400).json({ error: error.message });
        });
}

// exports.getProf = (req, res) => {
//     Professeurs.findOne({ _id: req.params.id })
//         .then((prof) => {
//             res.status(200).json({ prof })
//         })
//         .catch(error => { res.status(404).json({ error }) });
// }
        

exports.getProf = async (req, res) => {
    try {
        const professeurInstance = await Professeurs.findById(req.params.id)
            .populate('filieres')
            .populate('elements');

        if (!professeurInstance) {
            return res.status(404).json({ success: false, message: 'prof not found' });
        }

        res.status(200).json({ success: true, professeurInstance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
       


exports.updateProf = (req, res) => {
    Professeurs.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: "Prof update" })
        })
        .catch(error => {
            res.status(400).json({ error })
        })
}

exports.deleteProf = (req, res) => {
    Professeurs.deleteOne({ _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: "Professor deleted" })
        })
        .catch(error => {
            res.status(400).json({ error })
        })
}

exports.deleteAllProfs = (req, res) => {
    Professeurs.deleteMany({})
        .then(() => {
            res.status(200).json({ message: "All professors deleted" })
        })
        .catch(error => {
            res.status(400).json({ error })
        })
}




exports.countProfessors = async (req, res) => {
    try {
        const count = await Professeurs.countDocuments();
        res.status(200).json({ success: true, count });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error });
    }
}
// exports.LoginProf = async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const prof = await Professeurs.findOne({ email });

//       if (!prof) {
//         return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
//       }
//       const isPasswordValid = await prof.comparePassword(password);
  
//       if (!isPasswordValid) {
//         return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
//       }
//       res.status(200).json({ success: true, message: 'Authentification réussie', user: prof });
//     } catch (error) {
//       console.error('Erreur lors de la connexion du professeur:', error);
//       res.status(500).json({ success: false, message: 'Une erreur s\'est produite. Veuillez réessayer.' });
//     }
//   };
// exports.LoginProf = async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const prof = await Professeurs.findOne({ email });
  
//       if (!prof || prof.password !== password) {
//         return res.status(401).json({ success: false, message: 'Email ou mot de passe incorrect' });
//       }
      
//       res.status(200).json({ success: true, message: 'Authentification réussie', user: prof });
//     } catch (error) {
//       console.error('Erreur lors de la connexion du professeur:', error);
//       res.status(500).json({ success: false, message: 'Une erreur s\'est produite. Veuillez réessayer.' });
//     }
//   };


let csv = require('csvtojson');

exports.importProfs = async (req, res) => {
    try {
        var profData = [];
        const csvData = await csv().fromFile(req.file.path, { delimiter: ';' });

        // Log the parsed CSV data
        console.log("CSV Data:", csvData);

        // Processing each row
        for (const row of csvData) {
            // Splitting the row values
            const values = row['nom;penom;telephone;cin;Filiere;email'].split(';');
            
            // Extracting data from the values
            const nom = values[0];
            const prenom = values[1];
            const telephone = values[2];
            const cin = values[3];
            const filiereNames = values[4].split('&').map(name => name.trim().replace(/�/g, "é")); // Trim filiere names
            const email = values[5];

            console.log('Filiere Names:', filiereNames); // Log filiereNames array
            
            // Finding the filieres based on their names
            const filieresPromises = filiereNames.map(async (filiereName) => {
                const filiere = await Filiere.findOne({ shortNom: filiereName });
                console.log('Filiere:', filiere); // Log filiere result
                return filiere;
            });

            // Wait for all filieres to be fetched
            const filieres = await Promise.all(filieresPromises);
            console.log('hhhhhhhhh',filieres)
            // Extracting filiere IDs
            const filiereIds = filieres.map(filiere => filiere ? filiere._id : null); // Handle cases where filiere is null

            // Creating professor data object
            const profDataItem = {
                nom: nom,
                prenom: prenom,
                telephone: telephone,
                cin: cin,
                filieres: filiereIds,
                email: email
            };

            profData.push(profDataItem);
        }

        // Inserting professors into the database
        await Professeurs.insertMany(profData); 

        // Sending response
        res.status(200).json({ success: true, message: "Professors imported successfully", data: profData });
    } catch (error) {
        // Handling errors
        console.error("Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}




