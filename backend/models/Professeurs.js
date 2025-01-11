const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const ProfesseurSchema = mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    cin: { type: String, required: true, unique: true },
    email: { type: String, unique: true }, // Adding the email field
    telephone: { type: String, unique: true },
    dateDeNaissance: { type: Date },
    lieuDeNaissance: { type: String },
    adresse: { type: String },
    filieres: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Filieres'}],
    seances: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Seances' }],
    elements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Elements' }]
});

ProfesseurSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Professeurs', ProfesseurSchema);
