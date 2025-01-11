const mongoose = require('mongoose');
const Filiere = require('../models/Filieres');
const Professeur = require('../models/Professeurs');
exports.getAllFiliere = async (req, res) => {
    try {
        const filiereList = await Filiere.find().populate({
            path: 'elements',
            select: 'libelleElement'
        })
        
   
        if (!filiereList || filiereList.length === 0) {
            return res.status(404).json({ success: false, message: 'No filieres found' });
        }
        
        res.status(200).json({ success: true, filiereList });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}



exports.getFiliere = async (req, res) => {
    try {
        const filiereInstance = await Filiere.findOne({ nomFiliere: req.params.name })
            .populate({
                path: 'semestres',
            })
            .populate('elements');

        if (!filiereInstance) {
            return res.status(404).json({ success: false, message: 'Filiere not found' });
        }

        res.status(200).json({ success: true, filiereInstance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

exports.getFiliereById = async (req, res) => {
    try {
        const filiereInstance = await Filiere.findById(req.params.id)
            .populate({
                path: 'semestres',
            })
            .populate('elements');

        if (!filiereInstance) {
            return res.status(404).json({ success: false, message: 'Filiere not found' });
        }

        res.status(200).json({ success: true, filiereInstance });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};


exports.createFiliere = async (req, res) => {
    try {
        const filiere = new Filiere({
            ...req.body
        });

        await filiere.save();

        res.status(201).json({ success: true, filiere });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message, tes: 'hhh' });
    }
}

exports.updateFiliere = async (req, res) => {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({ success: false, message: 'Invalid filiere id' });
        }

        if(req.body.coordinateur){
        const cord = await Professeur.findById(req.body.coordinateur);
        if (!cord) {
            return res.status(400).json({ success: false, message: 'Invalid coordinateur' });
        }}

        if(req.body.professeurs){
        for (const prof of req.body.professeurs) {
            const profess = await Professeur.findById(prof);
            if (!profess) {
                return res.status(400).json({ success: false, message: `${prof} is an invalid professor` });
            }
        }}

        if(req.body.modules){
        for (const mod of req.body.modules) {
            const modul = await Module.findById(mod);
            if (!modul) {
                return res.status(400).json({ success: false, message: `${mod} is an invalid module` });
            }
        }}

        const updatedFiliere = await Filiere.findByIdAndUpdate(req.params.id, {
            nomFiliere: req.body.nomFiliere,
            descriptionFiliere: req.body.descriptionFiliere,
            coordinateur: req.body.coordinateur,
            modules: req.body.modules,
            professeurs: req.body.professeurs
        }, { new: true });

        res.status(200).json({ success: true, filiere: updatedFiliere });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
}

exports.deleteFiliere = async (req, res) => {
    try {
        const deletedFiliere = await Filiere.findByIdAndDelete(req.params.id);
        if (deletedFiliere) {
            return res.status(200).json({ success: true, message: 'The filiere is deleted!' });
        } else {
            return res.status(404).json({ success: false, message: 'Filiere not found!' });
        }
    } catch (error) {
        return res.status(500).json({ success: false, error: error});
    }
}


/*
exports.countFilieres = async (req, res) => {
    try {
        let filter = {};
        if (req.query.departement) {
            filter = { departement: req.query.departement };
        }

        const filiereCount = await Filiere.countDocuments(filter);

        if (!filiereCount) {
            return res.status(404).json({ success: false, message: "No filieres found with the provided filter" });
        }

        res.status(200).json({ success: true, filiereCount: filiereCount });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};
*/