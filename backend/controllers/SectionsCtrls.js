const Filieres = require('../models/Filieres')
const Sections = require('../models/Semestres')

exports.createSection = (req, res) => {

    Filieres.findOne({ nomFiliere: req.body.nomFiliere })
        .then((filiere) => {
            if (!filiere) {
                res.status(404).json({ message: 'filiere NOT found' })
            }
            const section = new Sections({
                ...req.body, filiere: filiere._id
            })
            section.save()
                .then(() => {
                    filiere.sections.push(section._id);
                    filiere.save()
                        .then(() => {
                            res.status(201).json({ message: 'section est crée !' })
                        })
                        .catch((error) => {
                            res.status(400).json({ error })
                        })
                })
                .catch((error) => {
                    res.status(400).json({ error })
                })
        })
        .catch((error) => {
            res.status(404).json({ error })
        })
}
exports.getSections = (req, res) => {
    Sections.find()
        .select('-semestre')
        .populate([{ path: 'filiere', select: 'nomFiliere coordinateur' }, { path: 'students', select: 'nom prenom cne' }])
        .then((sections) => {

            res.status(200).json({ sections })


        })
        .catch((error) => {
            res.status(400).json({ error })
        })



}
exports.getSection = (req, res) => {
    Sections.findOne({ _id: req.params.id })
        .select('-semestre')
        .populate([{ path: 'filiere', select: 'nomFiliere coordinateur' }, { path: 'students', select: 'nom prenom cne' }])
        .then((section) => {
            res.status(200).json({ section })
        })
        .catch(error => { res.status(404).json({ error }) });

}
exports.updateSection = (req, res) => {

    Sections.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(() => {
            res.status(200).json({ message: "section update" })
        })
        .catch(error => {
            res.status(400).json({ error })
        })


}

exports.deleteSection = (req, res) => {
}
exports.deleteAllSections = (req, res) => {
}
