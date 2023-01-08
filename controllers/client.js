const Product = require('../models/Product');
const ProductStat = require('../models/ProductState');
const Transactions = require('../models/Transactions');
const User = require('../models/User');
const getCountryISO3 = require('country-iso-2-to-3');
const OveralStat = require('../models/OveralStat');
const getProducts = async (req, res) => {
    try {
        // fetch all products
        const products = await Product.find();
        const productsWithStats = await Promise.all(
            products.map(async (product) => {
              const stat = await ProductStat.find({
                productId: product._id,
              });
              return {
                ...product._doc,
                ...stat[0]?._doc,
              };
            })
          );
        res.status(200).json(productsWithStats);
        // const products =  await Product.find();
        // products.map(async(prod) => {
        //     const newProd =  {...prod, _doc: {...prod._doc, image: 'https://i.pinimg.com/236x/f2/ff/70/f2ff700be40730c2128677de0815ec48.jpg',}};
        //     console.log(newProd);
        //     return await Product.findByIdAndUpdate(prod?._id, newProd, {new: true});
           
        // });
        // res.status(200).json(products);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
}

const getCustomers = async (req, res) => {
    try {
        // select all users data execluding the password
        const customers = await User.find({role: 'user'}).select('-password');
        res.status(200).json(customers);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
}
const getTransactions = async (req, res) => {
    try {
        // const {page = 1, pageSize = 20, sort = null, search = ''} = req.body;
        // currentData = page * pageSize;

        // const generateSort = () => {
        //     const sortParsed = JSON.parse(sort);
        //     cpnsole.log(sortParsed)
        //     const sortFormatted = {
        //         [sortParsed.field]: sortParsed.sort() == 'asc' ? 1 : -1
        //     }
        //     return sortFormated;
        // }

        // const startIndex = parseInt(page) * pageSize;
        // const sortFormated = Boolean(sort) ? generateSort() : {};
        //Find Documents that Contain String   db.collection.find({name: {$regex : /string/i}}) 

        // const transactions = await Transactions.find({
        //     $or: [{cost: {$regex: new RegExp(search, 'i')}}, {userId: {$regex: new RegExp(search, 'i')}}]
        // }).sort(sortFormated).skip(startIndex).limit(pageSize);

        // const total = await Transactions.countDocuments({
        //     name: {$regex: search, $options: 'i'}
        // })
        const transactions = await Transactions.find();
        res.status(200).json(transactions);
    
    }
    catch (error) {
        console.log(error);
        res.status(500).json({message: error.message}); 
    }

}
 const getGeography = async (req, res) => {
    try {
        const users = await User.find();
        // const mappedLoactions = users.reduce((acc, {country}) => {

        // })
        // this algorithm to find the number of users in each country
        const mappedLoactions = users.reduce((acc, {country}) => {
            const countryISo3 = getCountryISO3(country);
            if (!acc[countryISo3]) {
                acc[countryISo3] = 0;
            }
            acc[countryISo3]++;
            return acc;
        }, {});
        // get an array of objects ontains each country 
        const formattedLocations = Object.entries(mappedLoactions).map(([country, count]) => {
            return {id: country, value: count}
        })
        // const users = await User.find({}, {country: 1});
        res.status(200).json(formattedLocations);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
 }
 const getOverview = async (req, res) => {
    try {
        const overalStat = await OveralStat.find();
        res.status(200).json(overalStat[overalStat.length - 1]);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
}
module.exports = {getProducts, getCustomers, getTransactions, getGeography, getOverview};
