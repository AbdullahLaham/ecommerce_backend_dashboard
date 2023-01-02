const mongoose = require('mongoose')
const AffiliateSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
    affiliateSales: {
        type: [mongoose.Types.ObjectId],
        ref: "Transactions",
    },
}, {timestamps: true});
const AffiliateStat = mongoose.model('AffiliateStat', AffiliateSchema);
module.exports = AffiliateStat;
