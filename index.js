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


const app = express();
// app.use(helmet());
// app.use(morgan("common"));
app.use(bodyParser.json({"limit": "30mb", extended: true})); // 30mb because we will send images
app.use(bodyParser.urlencoded({"limit": "30mb", extended: true}));
app.use(cors());

app.use('/', (req, res) => res.send('app is running'));
app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);



// MONGOOSE SETUP
const PORT = 5000;
mongoose.connect('mongodb+srv://abdullah:RSxfmjMhdGPpCXhU@cluster0.dpiojbe.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true,})
.then(() => {
    app.listen(PORT, () => console.log('server is running on port ', PORT));
})
.catch((error) => {
    console.log(error);
});