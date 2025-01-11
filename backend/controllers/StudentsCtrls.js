const Students = require('../models/Students');
const Filiere=require('../models/Filieres');
const Element = require('../models/Elements')
const Semestre = require('../models/Semestres')

exports.createStudent = async (req, res) => {
    try {
        const { nom, prenom, cne, cin,email,  issueDe, telephone, redoublant, lieuDeNaissance, adresse, filieres,semestre } = req.body;

        const student = new Students({
            nom,
            prenom,
            cne,
            cin,
            email,
            issueDe,
            telephone,
            redoublant,
            lieuDeNaissance,
            adresse,
            filieres,
            semestre// Initializing as an empty array to align with the model
        });

        const createdStudent = await student.save();

        await createdStudent.save();

        res.status(201).json({ success: true, message: "Student created" });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ success: false, error });
    }
}

exports.getAllStudents = (req, res) => {
    Students.find()
        .then(students => {
            res.status(200).json(students);
        })
        .catch(error => { res.status(400).json({ error }); });
}

exports.getStudent = (req, res) => {
    Students.findOne({ _id: req.params.id })
        .populate('filieres')
        .populate('semestre')
        .then((student) => {
            res.status(200).json({ student });
        })
        .catch(error => { res.status(404).json({ error }); });
}

exports.updateStudent = (req, res) => {
    Students.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: "Student updated" });
        })
        .catch(error => {
            res.status(400).json({ error });
        });
}



exports.countStudents = async (req, res) => {
    try {
        const count = await Students.countDocuments();
        res.status(200).json({ success: true, count });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, error });
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        // Find the student by ID and delete it
        await Students.findByIdAndDelete(req.params.id);
        // Send success response
        res.status(200).json({ success: true, message: 'Student deleted successfully' });
    } catch (error) {
        // Send error response
        console.error('Error:', error);
        res.status(500).json({ success: false, error: 'Failed to delete student' });
    }
};
exports.deleteAllStudents = async (req, res) => {
    try {
  
        await Students.deleteMany({});


       

        res.status(200).json({ message: "All students deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

;

// Obtenez les étudiants du même semestre et de la même filière à partir du nom de l'élément
exports.getStudentsByElementName = async (req, res) => {
    try {
        const { filiereId, elementName } = req.params;

        // Trouver l'élément avec le nom donné et appartenant à la filière spécifiée
        const element = await Element.findOne({ libelleElement: elementName, filieres: filiereId });
        if (!element) {
            return res.status(404).json({ error: 'Élément non trouvé dans la filière spécifiée' });
        }

        const semestreId = element.semestre;
console.log(semestreId)
        // Rechercher tous les étudiants avec le même semestre et la même filière que l'élément spécifié
        const students = await Students.find({
            semestre: semestreId, // Le même semestre que celui de l'élément
            filieres: filiereId // La même filière que celle de l'élément
        });

        res.json(students);
    } catch (error) {
        console.error('Erreur lors de la récupération des étudiants :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des étudiants' });
    }
};



let csv = require('csvtojson');



exports.importStud = async (req, res) => {
    try {
        const studData = [];
        const csvData = await csv({
            delimiter: ';', // Ensure the delimiter is correctly set
            noheader: false, // Ensure headers are used
            headers: ['nom', 'penom', 'telephone', 'cin', 'filiere', 'semestre', 'email', 'issueDe', 'cne'], // Specify headers
        }).fromFile(req.file.path);

        // Log the parsed CSV data
        console.log("CSV Data:", csvData);

        // Ensure CSV data is not empty
        if (!csvData || !Array.isArray(csvData) || csvData.length === 0) {
            throw new Error("CSV data is empty or invalid.");
        }

        // Processing each row
        for (const row of csvData) {
            // Check if the row is empty
            if (!row.nom || !row.penom || !row.telephone || !row.cin || !row.filiere || !row.semestre || !row.email || !row.issueDe || !row.cne) {
                continue; // Skip empty or incomplete rows
            }

            // Extracting data from the row
            const { nom, penom: prenom, telephone, cin, filiere: filiereName, semestre: semestreName, email, issueDe, cne } = row;

            // Find the filiere
            const filiereObject = await Filiere.findOne({ shortNom: filiereName.trim().replace(/�/g, "é") });
            const filiereId = filiereObject ? filiereObject._id : null;

            // Find the semestre
            const semestreObject = await Semestre.findOne({ nomSemestre: semestreName.trim() });
            const semestreId = semestreObject ? semestreObject._id : null;

            // Create student data object
            const studentDataItem = {
                nom,
                prenom,
                telephone,
                cin,
                filieres: filiereId ? [filiereId] : [],
                semestre: semestreId,
                email,
                issueDe,
                cne
            };
            console.log('Student Data Item:', studentDataItem);

            studData.push(studentDataItem);
        }

        // Inserting students into the database
        await Students.insertMany(studData);

        // Sending response
        res.status(200).json({ success: true, message: "Students imported successfully", data: studData });
    } catch (error) {
        // Handling errors
        console.error("Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}
