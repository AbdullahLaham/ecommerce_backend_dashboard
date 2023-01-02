const mongoose = require("mongoose");
const User = require('../models/User');
const Transactions = require('../models/Transactions');

const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({role: "admin"}).select("-password");
        res.status(200).json(admins);
    }
    catch (error) {
        res.status(4004).json({message: error.message});
    }
}

const getUserPerformance = async (req, res) => {
    try {
        // const {id} = req.params;
        const userWithStats = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId('63701cc1f03239f09e00018a') } },
            {
                $lookup: {
                    from: 'affiliatestats', // the name of the table we want to export the data from it
                    localField: '_id', 
                    foreignField: 'userId', 
                    as: 'affiliateStats', 
                }
            },
            { $unwind: '$affiliateStats' },
        ]);
        let saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id) => {
                return Transactions.findById(id);
            })
        );
        saleTransactions = saleTransactions.filter((transaction) => transaction !== null);
        res.status(200).json({user: userWithStats, sales: saleTransactions});

        // const userPerformance = await Transactions.find({ userId: id });
        
    }
    catch (error) {
        res.status(4004).json({message: error.message});
    }
}


const signupUser = async (req, res) => {
    try {
        const user = req.body;
        console.log('hello', user)
        // const newUser = await new User(user);
        // res.status(200).json(newUser);
    }
    catch (error) {
        res.status(4004).json({message: error.message});
    }
}


const loginUser = async (req, res) => {
    try {
        console.log('hi hi')
        const { password, email } = req.body;
        console.log(password, email)
        const currentUser = await User.find({ email: email });
        if (currentUser?.email) {
            if (password == currentUser?.password) {
                res.status(200).json(currentUser);
            } else {
                res.status(500).json({message: 'there is wrong in email or password'});
            }
            
        } else {
            res.status(500).json({message: 'there is no user with this email'});
        }
        
    }
    catch (error) {
        res.status(4004).json({message: error.message});
    }
}

module.exports = {getAdmins, getUserPerformance, loginUser, signupUser};
