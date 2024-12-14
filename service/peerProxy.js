const { WebSocketServer } = require('ws');
const uuid = require('uuid');

function peerProxy(httpServer) {
    console.log('peerProxy called');
  // Create a websocket object
  const wss = new WebSocketServer({ noServer: true });
  console.log(wss)
  // Handle the protocol upgrade from HTTP to WebSocket
  httpServer.on('upgrade', (request, socket, head) => {
    console.log('updating http');
    wss.handleUpgrade(request, socket, head, function done(ws) {
      wss.emit('connection', ws, request);
    });
  });

  // Keep track of all the connections so we can forward messages
  let connections = [];

  wss.on('connection', (ws) => {
    console.log('connection called')
    const connection = { id: uuid.v4(), alive: true, ws: ws };
    connections.push(connection);
    console.log('connection established')

    // Forward messages to everyone INCLUDING the sender
    ws.on('message', function message(data) {
        console.log('message');
      connections.forEach((c) => {
          c.ws.send(data);
      });
    });

    // Remove the closed connection so we don't try to forward anymore
    ws.on('close', () => {
        console.log('closed')
      const pos = connections.findIndex((o, i) => o.id === connection.id);

      if (pos >= 0) {
        connections.splice(pos, 1);
      }
    });

    // Respond to pong messages by marking the connection alive
    ws.on('pong', () => {
        console.log('pong')
      connection.alive = true;
    });
  });

  // Keep active connections alive
  setInterval(() => {
    console.log('interval')
    connections.forEach((c) => {
      // Kill any connection that didn't respond to the ping last time
      if (!c.alive) {
        c.ws.terminate();
      } else {
        c.alive = false;
        c.ws.ping();
      }
    });
  }, 10000);
}

module.exports = { peerProxy };

    