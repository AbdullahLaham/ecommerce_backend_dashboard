const User = require('../models/User');
const OveralStat = require('../models/OveralStat');
const Transactions = require('../models/Transactions');
const Product = require('../models/Product');
const getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(String(id));
        res.status(200).json(user);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
}
const getDashboardData = async (req, res) => {
    try {
        // to get the dynamic Dates
        /*
        const date = new Date().toISOString().substring(0, 10);
        let currentMonth = date.substring(5,7)
        currentMonth = new Date().toLocaleString('en-US', { month: 'long' });
        console.log(currentMonth) 
         */

        const currentMonth = 'December'
        const currentYear = 2021;
        const currentDay = '2022-12-31';
        /*Recent Transactions */
        const transactions = await Transactions.find().limit(50).sort({ createdAt: -1 });
        /*Overal Stats */
        const overalStat = await OveralStat.find({ year: currentYear });
        const { totalCustomers, yearlySalesTotal, yearlyTotalSoldUnits, monthlyData, salesByCategory } = overalStat[0];
        const thisMonthStats = overalStat[0].monthlyData.find(({month}) => month == currentMonth)
        const todayStats = overalStat[0].dailyData.find(({date}) => date == currentDay);
        console.log({
            totalCustomers, yearlySalesTotal, yearlyTotalSoldUnits, monthlyData, salesByCategory, thisMonthStats, todayStats
        })
        res.status(200).json({
            totalCustomers, yearlySalesTotal, yearlyTotalSoldUnits, monthlyData, salesByCategory, thisMonthStats, todayStats, transactions
        });
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
}

const getAllProducts = async (req, res) => {
    try {
        console.log('helllllllllllllo')
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
}
const getCategories = async (req, res) => {
    try {
        const categories = ['clothing', 'accessories', 'misc', 'shoes'];
        res.status(200).json({data: categories});
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
}
const getCategoryProducts = async (req, res) => {
    try {
        const {category} = req.body;
        console.log('category', category);
        const products = Product.find({category});
        res.status(200).json(products);
    }
    catch (error) {
        console.log(error)
        res.status(500).json({message: error.message});
    }
}

module.exports = {getUser, getDashboardData, getAllProducts, getCategories, getCategoryProducts};
