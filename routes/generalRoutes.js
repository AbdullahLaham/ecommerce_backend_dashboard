const express = require('express');
const {getUser} = require('../controllers/general');
const {getDashboardData, getAllProducts, getCategories, getCategoryProducts} = require('../controllers/general')
const generalRoutes = express.Router();

// backend data
generalRoutes.get('/user/:id', getUser);
generalRoutes.get('/dashboard', getDashboardData);


// frontEnd data
generalRoutes.get('/getProducts', getAllProducts);
generalRoutes.get('/getCategories', getCategories);
generalRoutes.get('/getCategoryProducts', getCategoryProducts)
module.exports = {generalRoutes, };