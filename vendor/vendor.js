'use strict';

// Every 5 seconds, simulate a new customer order
// Create a fake order, as an object:
// storeName, orderId, customerName, address
// Emit a ‘pickup’ event and attach the fake order as payload
// HINT: Have some fun by using the faker library to make up phony information
// Monitor the system for events …
// Whenever the ‘delivered’ event occurs
// Log “thank you” to the console

require('dotenv').config();
// const events = require('./event-pool');
const storeName = process.env.STORENAME;
const faker = require('faker');
//const caps = require('./caps.js');
// const driver = require('./driver.js');

const io = require('socket.io-client');
let host = 'http://localhost:3000';
const hubConnection = io.connect(host);
const vendorConnection = io.connect(`${host}/caps-namespace`);
vendorConnection.emit('join', storeName);



setInterval(() => {
  let order = {
    store: storeName,
    orderID: faker.random.uuid(),
    customer: faker.name.firstName() + ' ' + faker.name.lastName(),
    address: faker.address.streetAddress(),
  };
  hubConnection.emit('pickup', order);
}, 2000);

vendorConnection.on('delivered', payload => thanks('delivered', payload));

function thanks(event, payload) {
  console.log('VENDOR: Thank you for delivering order', payload.orderID);
}



