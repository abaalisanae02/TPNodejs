const express = require('express');
const router = express.Router();
const multer = require('multer'); // Import Multer

// Define Multer storage configuration
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

module.exports = function (app, requestHandlers) {
    router.get('/', (req, res) => {
        // Renvoyer la page HTML de connexion
        res.sendFile(__dirname + '/presentation/loginpageHTML.html');
    });
    router.get('/home', (req, res) => {
    // Renvoyer la page d'accueil
    res.sendFile(__dirname + '/presentation/home.html');
    });
    router.get('/uploadPage', (req, res) => {
    res.sendFile(__dirname + '/presentation/upload.html');
    });
    router.get('/showPage', (req, res) => {
        res.sendFile(__dirname + '/presentation/show.html');
        });
    router.get('/findPage', (req, res) => {
        res.sendFile(__dirname + '/presentation/find.html');
        });
    router.get('/show', requestHandlers.show);
    router.post('/upload', upload.single('file'), requestHandlers.upload);
    router.get('/find', requestHandlers.find);
    router.get('/login', (req, res) => {
        // Appeler la fonction de connexion avec les informations de la requête
        requestHandlers.login(req.query.username, req.query.password, res);
    });
    router.get('/logout', requestHandlers.logout);

    app.use('/', router);
};