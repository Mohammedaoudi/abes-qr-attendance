const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const StudentSchema = mongoose.Schema({

    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    cne: { type: String, required: true, unique: true },
    cin:{ type: String, required: true, unique: true },
    email: { type: String, unique: true }, // Adding the email field
    issueDe:{ type: String, enum:['2AP','PASSERELLE','BAC','CNC'],required:true},
    telephone: { type: Number,  unique: true },
    redoublant:{type:Boolean,default:false},
    dateDeNaissance:{ type: String},
    lieuDeNaissance:{ type: String},
    adresse:{ type: String},
    semestre:{type:mongoose.Schema.Types.ObjectId,ref:'Semestres'},

    filieres:{type:mongoose.Schema.Types.ObjectId,ref:'Filieres',required:true}
})
StudentSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Students', StudentSchema);