const express = require('express');
const {getUser} = require('../controllers/general');
const {getDashboardData} = require('../controllers/general')
const generalRoutes = express.Router();
generalRoutes.get('/user/:id', getUser);
generalRoutes.get('/dashboard', getDashboardData);
module.exports = {generalRoutes};