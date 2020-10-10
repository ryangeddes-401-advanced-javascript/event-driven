'use strict';


const events = require('./event-pool.js');
const driver = require('./driver.js');

events.on('pickup', payload => log('pickup', payload));
events.on('in-transit', payload => log('in-transit', payload));
events.on('delivered', payload => log('delivered', payload));

function log(event, payload) {
  let time = new Date();
  console.log('EVENT', { event, time, payload });
}

