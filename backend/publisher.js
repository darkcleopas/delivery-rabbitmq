#!/usr/bin/env node
require('dotenv').config();
const amqp = require('amqplib/callback_api');

const BROKER_ADDRESS = process.env.BROKER_ADDRESS || 'localhost';


function sendOrders(orders) {

    amqp.connect(`amqp://${BROKER_ADDRESS}`, (error0, connection) => {
        if (error0) {
            throw error0;
        }

        console.log("Conectado ao broker RabbitMQ");

        connection.createChannel((error1, channel) => {
            if (error1) {
                throw error1;
            }

            const queue = process.env.QUEUE;

            channel.assertQueue(queue, { durable: true });

            channel.sendToQueue(queue, Buffer.from(JSON.stringify(orders)) );

            console.log("Pedido enviado com sucesso!");

            setTimeout(() => process.exit(), 1000);
        });
    });
};


module.exports = { sendOrders }