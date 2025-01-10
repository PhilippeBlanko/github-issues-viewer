const http = require('http');
const socketIo = require('socket.io');

const websocketServer = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server running');
});

const io = socketIo(websocketServer, {
  cors: {
    origin: 'http://localhost:3000',  // Autoriser uniquement localhost:3000
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
    credentials: true,  // Cela permet de partager les cookies si nécessaire
  },
  transports: ['websocket', 'polling']  // Assurez-vous d'autoriser le transport de type polling
});

io.on('connection', (socket) => {
  console.log(`a user connected with ID: ${socket.id}`);

  // Événement pour la déconnexion
  socket.on('disconnect', () => {
    console.log(`a user disconnected with ID: ${socket.id}`);
  });

  socket.on('message', (msg) => {
    console.log(`Message from client (ID: ${socket.id}):`, msg);
    socket.broadcast.emit('message', msg);  // Diffuse à tous les autres clients
  });

  setTimeout(() => {
    socket.emit('message', 'Hello from WebSocket Server!');
  }, 2000);
});

websocketServer.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
