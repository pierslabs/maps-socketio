const Markers = require('./markers');

class Sockets {
  constructor(io) {
    this.io = io;
    this.markers = new Markers();
    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      // TODO: active-markers
      //TODO:create markers
      //TODO: delete markers
      //TODO: update markers
    });
  }
}

module.exports = Sockets;
