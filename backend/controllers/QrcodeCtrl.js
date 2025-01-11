const QrCode = require('../models/QrCodes');

// Créer un QR code
exports.createQrCode = async (req, res) => {
    try {
        const { code, seanceId } = req.body;
        const qrCode = new QrCode({
            code,
            seance: seanceId
        });
        const savedQrCode = await qrCode.save();
        res.status(201).json(savedQrCode);
    } catch (error) {
        console.error('Erreur lors de la création du QR code :', error);
        res.status(500).json({ error: 'Erreur lors de la création du QR code' });
    }
};

// Obtenir tous les QR codes
exports.getAllQrCodes = async (req, res) => {
    try {
        const qrCodes = await QrCode.find();
        res.json(qrCodes);
    } catch (error) {
        console.error('Erreur lors de la récupération des QR codes :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des QR codes' });
    }
};

// Obtenir un QR code par ID
exports.getQrCodeById = async (req, res) => {
    try {
        const qrCode = await QrCode.findById(req.params.qrCodeId);
        if (!qrCode) {
            return res.status(404).json({ error: 'QR code non trouvé' });
        }
        res.json(qrCode);
    } catch (error) {
        console.error('Erreur lors de la récupération du QR code :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération du QR code' });
    }
};

// Obtenir un QR code par son code
exports.getQrCodeByCode = async (req, res) => {
    try {
        const qrCode = await QrCode.findOne({ code: req.params.code });
        if (!qrCode) {
            return res.status(404).json({ error: 'QR code non trouvé' });
        }
        res.json(qrCode);
    } catch (error) {
        console.error('Erreur lors de la récupération du QR code :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération du QR code' });
    }
};

// Obtenir un QR code par ID de séance
exports.getQrCodeBySeanceId = async (req, res) => {
    try {
        const qrCode = await QrCode.findOne({ seance: req.params.seanceId });
        if (!qrCode) {
            return res.status(404).json({ error: 'QR code non trouvé pour cette séance' });
        }
        res.json(qrCode);
    } catch (error) {
        console.error('Erreur lors de la récupération du QR code :', error);
        res.status(500).json({ error: 'Erreur lors de la récupération du QR code' });
    }
};
