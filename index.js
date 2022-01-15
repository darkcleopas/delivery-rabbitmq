#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
require('dotenv').config();

const BROKER_ADDRESS = process.env.BROKER_ADDRESS || 'localhost';

const productName = process.argv[2] || "Farinha branca";
const deliveryAddress = process.argv[3] || "Ceilândia, em frente ao lote 14";

amqp.connect(`amqp://${BROKER_ADDRESS}`, (err0, conn) => {
    if (err0) {
        throw err0;
    }

    conn.createChannel((err1, ch) => {
        if (err1) {
            throw err1;
        }

        const queue = "orders";

        const order = {
            productName: productName,
            deliveryAddress: deliveryAddress
        };

        ch.assertQueue(queue, { durable: false });

        ch.sendToQueue(queue, Buffer.from(JSON.stringify(order)) );

        console.log("Order send with success!");

        setTimeout(() => process.exit(), 1000);
    });
});

