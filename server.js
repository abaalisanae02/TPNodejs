const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const router = require('./router');
const requestHandlers = require('./requestHandlers');

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/P2P', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connecté à MongoDB");
}).catch(err => {
    console.error("Erreur de connexion à MongoDB:", err);
});

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configurer Socket.IO
io.on('connection', (socket) => {
    console.log('Nouvelle connexion socket : ' + socket.id);

    // Gérer la demande d'affichage d'image
    socket.on('showImage', () => {
        requestHandlers.show(socket);
    });
     // Gérer la demande d'affichage d'image
     socket.on('find', () => {
        requestHandlers.find(socket);
    });

});

// Configure Multer for file uploads
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Configurer les routes
router(app, requestHandlers);

const PORT = process.env.PORT || 8888;
server.listen(PORT, () => {
    console.log("Serveur en cours d\exécution sur le port" +PORT);
});