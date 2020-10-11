'use strict';

const port = process.env.PORT || 3000;

const io = require('socket.io')(port);

//const events = require('./event-pool.js');
// const driver = require('./driver.js');

io.on('connection', (socket) => {

  console.log('CONNECTED', socket.id);

  socket.on('pickup', payload => log('pickup', payload));
  //socket.on('in-transit', payload => log('in-transit', payload));
  //socket.on('delivered', payload => log('delivered', payload));
});

const caps = io.of('/caps-namespace');

caps.on('connection', (socket) => {
  socket.on('join', room => {
    console.log('VENDOR CONNECTED IN CHANNEL:', room);
    socket.join(room);
  });

  // socket.on('pickup', (payload) => {
  //   log('pickup', payload);
  //   caps.to(`${payload.store}`).emit('pickup', payload);
  // });

  socket.on('in-transit', (payload) => {
    log('in-transit', payload);
    caps.to(`${payload.store}`).emit('in-transit', payload);
  });

  socket.on('delivered', (payload) => {
    log('delivered', payload);
    caps.to(`${payload.store}`).emit('delivered', payload);
  });

});

function log(event, payload) {
  let time = new Date();
  console.log('EVENT', { event, time, payload });
  io.emit(`${event}`, payload);
}


