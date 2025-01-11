const express = require('express');
const router = express.Router();
const qrCodeController = require('../controllers/QrcodeCtrl');

// Créer un QR code
router.post('/qr-codes', qrCodeController.createQrCode);

// Obtenir tous les QR codes
router.get('/qr-codes', qrCodeController.getAllQrCodes);

// Obtenir un QR code par ID
router.get('/qr-codes/:qrCodeId', qrCodeController.getQrCodeById);

// Obtenir un QR code par son code
router.get('/qr-codes/code/:code', qrCodeController.getQrCodeByCode);

// Obtenir un QR code par ID de séance
router.get('/qr-codes/seance/:seanceId', qrCodeController.getQrCodeBySeanceId);

module.exports = router;
