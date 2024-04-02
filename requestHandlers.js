const File = require('./models/File');
const User = require('./models/User');

// Fonction pour afficher une image en utilisant Socket.IO
async function show(socket) {
    console.log("Request handler 'show' was called.");

    // Recherchez l'image dans la base de données ou toute autre source de données
    // Ici, nous supposons que vous avez un modèle de fichier (File) contenant les images
    try{
    const file= await File.findOne().sort({ _id: -1 }).exec()
        if (!file) {
            console.error('Erreur lors de la recherche de l\'image');
            // Envoyer un message d'erreur au client
        } else {
            console.log("image trouvée")
            // Convert the Buffer data to base64 string
            const base64ImageData = file.data.toString('base64');
            // Envoyer l'image au client via Socket.IO
            socket.emit('image', base64ImageData);
        }
    } catch(err) {
        console.error('Erreur lors de la recherche de l\'image:', err);
        // Envoyer un message d'erreur au client
    };}
// Fonction pour télécharger un fichier
async function upload(req, res) {
    console.log("Request handler 'upload' was called.");
    console.log(req.file);

    try {
        // Vérifier si un fichier a été téléchargé
        if (!req.file) {
            return res.status(400).send('Aucun fichier téléchargé.');
        }

        const file = req.file;

        // Créer un nouvel objet fichier
        const newFile = new File({
            filename: file.originalname, // Use originalname instead of name
            data: file.buffer // Use buffer instead of data
        });

        // Enregistrer le fichier dans la base de données
        await newFile.save();

        res.status(200).send("Fichier téléchargé avec succès.");
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement du fichier:', error);
        res.status(500).send("Erreur lors de l'enregistrement du fichier dans la base de données.");
    }
}

// requestHandlers.js

// Fonction pour afficher toutes les images
async function find(socket) {
    console.log("Request handler 'find' was called.");

    try {
        // Recherchez toutes les images dans la base de données
        const files = await File.find();

        // Convertir les données des images en base64
        const base64Images = files.map(file => file.data.toString('base64'));

        // Envoyer toutes les images au client via Socket.IO
        socket.emit('allImages', base64Images);
    } catch (error) {
        console.error('Erreur lors de la recherche des images:', error);
        // Envoyer un message d'erreur au client si nécessaire
    }
}


// Fonction de connexion
async function login(username, password, res) {
    console.log("Request handler 'login' was called.");


    try {
        const users = await User.find();

        // Rechercher l'utilisateur dans la collection "users"
        const user = users.find(user => user.username === username && user.password === password);

        if (!user) {
            // Utilisateur non trouvé
            console.log("Utilisateur non trouvé.");
            res.status(401).send("Nom d'utilisateur ou mot de passe incorrect.");
        } else {
            // Authentification réussie
            // Rediriger l'utilisateur vers la page d'accueil
            console.log("Utilisateur trouvé:", user);
            res.redirect('/home');
        }
    } catch (error) {
        // Erreur lors de la tentative de connexion
        console.error('Erreur lors de la connexion:', error);
        res.status(500).send("Erreur lors de la connexion.");
    }
}
// Fonction de déconnexion
function logout(res) {
    console.log("Request handler 'logout' was called.");
    // Implémentez ici la logique de déconnexion
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end();
}

module.exports = {
    show: show,
    upload: upload,
    find: find,
    login: login,
    logout: logout
};