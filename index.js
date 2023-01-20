const express = require('express');
const bodyParser = require('body-parser');
const { urlencoded } = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const {dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat} = require('./data');
const User = require('./models/User');
const Product = require('./models/Product');
const ProductStat = require('./models/ProductState')
const Transactions = require('./models/Transactions');
const OveralStat = require('./models/OveralStat');
// const AffiliateStat = require('./models/AffiliateState');

//  , abdullah
// const { createPost } = require('./controllers/posts');
const {clientRoutes, generalRoutes, managementRoutes } = require('./routes');
dotenv.config();
const app = express();
app.use(express.json());
// app.use(helmet());
// app.use(morgan("common"));
app.use(bodyParser.json({"limit": "30mb", extended: true})); // 30mb because we will send images
app.use(bodyParser.urlencoded({"limit": "30mb", extended: true}));
app.use(cors());

app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/', (req, res) => res.send('app is running'));

// MONGOOSE SETUP
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true,})
.then(() => {
    // only add data on time
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transactions.insertMany(dataTransaction)
    // OveralStat.insertMany(dataOverallStat)
    // AffiliateStat.insertMany(dataAffiliateStat)
    app.listen(PORT, () => console.log('server is running on port ', PORT));
})
.catch((error) => {
    console.log(error);
});