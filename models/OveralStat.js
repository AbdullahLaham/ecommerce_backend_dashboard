const mongoose = require("mongoose");
const OveralStatSchema = new mongoose.Schema({
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [{
        month: String,
        totalSales: Number,
        totalUnits: Number,
    }],
    dailyData: [{
        date: String,
        totalSales: Number,
        totalUnits: Number 
    },],
    salesByCategory: {
        type: Map,
        of: Number,
    },
  },
{timestamps: true}); // to create a date and update a date

const OveralStat = mongoose.model('OveralStat', OveralStatSchema);
module.exports = OveralStat;

