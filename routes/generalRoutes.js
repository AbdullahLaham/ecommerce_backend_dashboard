const express = require('express');
const {getUser} = require('../controllers/general');
const {getDashboardData, getAllProducts, getCategories, getCategoryProducts, fetchProductDetails} = require('../controllers/general')
const generalRoutes = express.Router();

// backend data
generalRoutes.get('/user/:id', getUser);
generalRoutes.get('/dashboard', getDashboardData);


// frontEnd data
generalRoutes.get('/getProducts', getAllProducts);
generalRoutes.get('/getCategories', getCategories);
generalRoutes.get('/getCategoryProducts/:category', getCategoryProducts);
generalRoutes.get('/fetchProductDetails/:id', fetchProductDetails);
module.exports = {generalRoutes, };