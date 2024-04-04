const express = require('express');
const session = require('express-session');
const connectDB = require('./src/config/db');
const authRoutes = require('./src/api/routes/authRoutes');
const clientRoutes = require('./src/api/routes/clientRoutes/clientRoutes.js');
const contractRoutes = require('./src/api/routes/contractRoutes/contractRoutes.js');
const path = require('path');

connectDB();

const app = express();

// Middleware to serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // should be true in production with HTTPS
}));

// Serve static files from the uploads directory
app.use('/client/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(authRoutes);
app.use(clientRoutes);
app.use(contractRoutes); // Use contract routes

// Admin dashboard route
app.get('/admin/dashboard', (req, res) => {
    if (req.session.userId && req.session.role === 'admin') {
        res.sendFile(path.join(__dirname, 'public', 'admin-dashboard.html'));
    } else {
        res.status(401).send('Access Denied');
    }
});

// Client dashboard route
app.get('/client/dashboard', (req, res) => {
    if (req.session.userId && req.session.role === 'client') {
        res.sendFile(path.join(__dirname, 'public', 'client-dashboard.html'));
    } else {
        res.status(401).send('Access Denied');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
