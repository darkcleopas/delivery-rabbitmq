const { products } = require('./db.js');


function getProducts () {

    return products;

}

function getProduct (id) {

    return products.find(product => product.id == id);

}

function addOrder (orders, order) {

    orders.push(order);

    console.log("Pedido adicionado!");

    return orders;
}

function removeOrder (orders, id) {

    orders = orders.filter(({ productId }) => productId !== id);

    console.log("Pedido removido!");

    return orders;
}

function getOrdersValue (orders) {

    let orderValue = 0;

    for (let i = 0; i < orders.length; i++) {
        orderValue = orderValue + (orders[i].orderValue);
    }

    return orderValue;
}


module.exports = { getProducts, getProduct, addOrder, removeOrder, getOrdersValue }