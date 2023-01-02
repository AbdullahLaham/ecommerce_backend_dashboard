const mongoose = require("mongoose");
const ProductStateSchema = new mongoose.Schema({
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    monthlyData: {
        type: [
            {
            month: String,
            totalSales: Number,
            totalUnits: Number,
        }
    ],
    },
    dailyData: {
        type: [
            {
            date: String,
            totalSales: Number,
            totalUnits: Number,
        }
    ],
    }
  },
{timestamps: true}); // to create a date and update a date

const ProductStat = mongoose.model('ProductStat', ProductStateSchema);
module.exports = ProductStat;