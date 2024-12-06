// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/event_registration', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Define a storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Event model
const Event = mongoose.model('Event', new mongoose.Schema({
    name: String,
    email: String,
    date: String,
    image: String,
    message: String
}));

// Routes
app.get('/', (req, res) => {
    res.render('index'); // Home page with events
});

app.get('/event/:eventName', (req, res) => {
    res.render('event', { eventName: req.params.eventName }); // Event registration form
});

app.post('/register', upload.single('image'), (req, res) => {
    const newEvent = new Event({
        name: req.body.name,
        email: req.body.email,
        date: req.body.date,
        image: req.file.path,
        message: req.body.message
    });
    newEvent.save().then(() => res.redirect('/')).catch(err => res.status(400).send(err));
});

app.get('/admin', (req, res) => {
    Event.find().then(events => res.render('admin', { events: events }));
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});