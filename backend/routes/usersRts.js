const express = require('express');
const Router = express.Router();
const UsersCtrls = require('../controllers/usersCtrls');
const auth = require('../middleware/auth');




Router.post('/login',UsersCtrls.login);
Router.put('/:userId/update-password',UsersCtrls.updatePassword);
Router.get('/:userId/name',auth, UsersCtrls.getUserNameById);
Router.get('/:userId',auth, UsersCtrls.getUserById);
Router.get('/getAll', UsersCtrls.getAllUsers);


// Routerouter.post('/update-password',UsersCtrls.updatePassword);

module.exports = Router;
