'use strict';

// Monitor the system for events …
// On the ‘pickup’ event …
// Wait 1 second
// Log “DRIVER: picked up [ORDER_ID]” to the console.
// Emit an ‘in-transit’ event with the payload you received
// Wait 3 seconds
// Log “delivered” to the console
// Emit a ‘delivered’ event with the same payload



'use strict';

const events = require('./event-pool.js');

events.on('pickup', payload => pickup(payload));

function pickup(payload) {
  setTimeout(driver, 1000, payload);
  setTimeout(delivered, 3000, payload);
}

function driver(payload) {
  let orderid = payload.orderID;
  console.log('DRIVER: picked up', orderid);
  events.emit('in-transit', payload);

}

function delivered(payload) {
  let orderid = payload.orderID;
  console.log('DRIVER: delivered', orderid);
  events.emit('delivered', payload);
}