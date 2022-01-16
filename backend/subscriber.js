#!/usr/bin/env node

var amqp = require('amqplib/callback_api');
require('dotenv').config();

const BROKER_ADDRESS = process.env.BROKER_ADDRESS || 'localhost';


amqp.connect(`amqp://${BROKER_ADDRESS}`, function(error0, connection) {
    
    if (error0) {
        throw error0;
    }

    console.log("Conectado ao broker RabbitMQ");

    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var queue = process.env.QUEUE;

        channel.assertQueue(queue, {
            durable: true
        });

        console.log(" [*] Esperando por pedidos em %s.", queue);

        channel.consume(queue, function(msg) {

            console.log("Um novo pedido apareceu!");

            const orders = JSON.parse(msg.content.toString());

            console.log(orders);
        }, {
            noAck: true
        });
    });
});