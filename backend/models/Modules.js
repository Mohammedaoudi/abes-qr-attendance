const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
    lebelle_module: { type: String, required: true },
    elements: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Elements', required: false }],
    semestre: { type: mongoose.Schema.Types.ObjectId, ref: 'Semestres', required: false }
});

// Enregistrement du modèle "Module"
const Module = mongoose.model('Module', moduleSchema);

module.exports = Module;