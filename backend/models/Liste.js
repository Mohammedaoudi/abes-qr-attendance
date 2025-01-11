const mongoose = require('mongoose');

const listeSchema = new mongoose.Schema({
    students: [{
        eleve: {
            type: mongoose.Schema.Types.ObjectId, ref:'Students'
        },
        absence: {
            type: Boolean,
            default: false // Default to false indicating student is not absent
        }
    }],
    seance: {
        type: mongoose.Schema.Types.ObjectId, ref:'Seances'
    },
    prof: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Professeurs'
    },
    createdDate: {
        type: Date,
        default: Date.now // Default to the current date
    }
});

module.exports = mongoose.model('Liste', listeSchema);
