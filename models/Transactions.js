const mongoose = require("mongoose");
const TransactionsSchema = new mongoose.Schema({
    userId: {
      type: String,
      required: true,
    },
    cost: {
        type: String,
        require: true,

    },
    products: {
        type: [mongoose.Types.ObjectId],
        of: Number,
    }
  },
{timestamps: true}); // to create a date and update a date

const Transactions = mongoose.model('Transactions', TransactionsSchema);
module.exports = Transactions;

