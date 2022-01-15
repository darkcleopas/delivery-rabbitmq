#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
require('dotenv').config();

const BROKER_ADDRESS = process.env.BROKER_ADDRESS || 'localhost';

const productName = process.argv[2] || "Farinha branca";
const deliveryAddress = process.argv[3] || "Ceilândia, em frente ao lote 14";

amqp.connect(`amqp://${BROKER_ADDRESS}`, (error0, connection) => {
    if (error0) {
        throw error0;
    }

    connection.createChannel((error1, channel) => {
        if (error1) {
            throw error1;
        }

        const queue = "orders";

        const order = {
            productName: productName,
            deliveryAddress: deliveryAddress
        };

        channel.assertQueue(queue, { durable: false });

        channel.sendToQueue(queue, Buffer.from(JSON.stringify(order)) );

        console.log("Order send with success!");

        setTimeout(() => process.exit(), 1000);
    });
});

