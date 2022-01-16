require('dotenv').config();

const { addOrder, removeOrder, getOrdersValue, getProducts, getProduct } = require('./functions.js');

const express = require('express');


let orders = [];

let app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.get('/products', function (req, res) {

    res.json(getProducts());

});

app.post('/add_order', function (req, res) {

    const { productId, productAmount } = req.body;

    const { name, price } = getProduct(productId);

    let order = {
        "productId": productId,
        "productName": name,
        "productPrice": price,
        "productAmount": productAmount,
        "orderValue": price*productAmount
    }

    orders = addOrder(orders, order);

    console.log(order);

    res.send(order);

});

app.delete('/remove_order', function (req, res) {

    const { productId } = req.body;

    orders = removeOrder(orders, productId)

    res.send(orders);

});

app.get('/orders_value', function (req, res) {

    res.json({"ordersValue": getOrdersValue(orders)});

});

app.get('/orders', function (req, res) {

    res.send(orders);

});

app.post('/finish_orders', function (req, res) {

    const { address } = req.body;

    let ordersValue = getOrdersValue(orders);

    try{
        const { sendOrders } = require('./publisher.js');
    
        console.log({"orders": orders, "ordersValue": ordersValue, "address": address});
        sendOrders({"orders": orders, "ordersValue": ordersValue, "address": address});

        orders = [];

        res.sendStatus(200);

    } catch(e) {
        console.error(e);
        res.sendStatus(500);
    }

});

app.listen(process.env.PORT || 4000, function () {
    console.log('Node app está funcionando!');
});









