const express = require('express');
const {getAdmins, getUserPerformance, loginUser, signupUser} = require('../controllers/management');
const managementRoutes = express.Router();
managementRoutes.get('/admins', getAdmins);
managementRoutes.get('/performance/:id', getUserPerformance);


managementRoutes.post('/loginUser', loginUser);
managementRoutes.post('/signupUser', signupUser);

module.exports = {managementRoutes};
