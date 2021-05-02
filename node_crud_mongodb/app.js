const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/products');
const app = express();

app.use(express.urlencoded({ extended: true }));
const mongodb = 'mongodb://localhost:27017/product-database?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false';
mongoose.connect(mongodb, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected');
    app.listen(3000);

}).catch(err => console.log(err));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/get-products');
});

app.get('/get-products', (req, res) => {

    Product.find().then(result => {

        res.render('index', { products: result });
    }).catch(err => console.log(err));
});

app.get('/add-product', (req, res) => {
    res.render('add-product');
});

app.post('/products', (req, res) => {
    console.log(req.body);
    const product = Product(req.body);
    product.save().then(()=>{
        res.redirect('/get-products');
    }).catch(err => console.log(err));
});

app.get('/products/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id;
    Product.findById(id).then(result => {
        console.log('result', result);
        res.render('product-detail', { product: result });
    });
});

app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    Product.findByIdAndDelete(id).then(result => {
        res.json({ redirect: '/get-products' });
    });
});

app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    Product.findByIdAndUpdate(id, req.body).then(result => {
        res.json({ msg: 'Updated Successfully' })
    });
});

app.use((req, res) => {
    res.render('error');
});