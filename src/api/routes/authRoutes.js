const express = require('express');
const Client = require('../models/Client');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password, role } = req.body;

    console.log('Attempting to find user:', email, 'with role:', role);

    let user;
    if (role === 'admin') {
        user = await User.findOne({ email });
    } else if (role === 'client') {
        user = await Client.findOne({ email });
    }

    if (!user) {
        console.log('No user found with that email and role');
        return res.status(401).send('Authentication failed');
    }

    console.log('User found, comparing password...');
    console.log("Submitted password:", password);
    console.log("Stored hashed password:", user.password);

    const isMatch = await user.comparePassword(password);
    console.log("Submitted password:", password);
    console.log("Stored hashed password:", user.password);
    console.log("Password match result:", isMatch);

    if (isMatch) {
        console.log('Password is correct, setting session...');
        req.session.userId = user._id;
        req.session.role = user.role;
        req.session.name = user.name;

        if (user.role === 'admin') {
            res.redirect('/admin/dashboard');
        } else if (user.role === 'client') {
            res.redirect('/client/dashboard');
        } else {
            res.status(401).send('Role not handled');
        }
    } else {
        console.log('Password is incorrect');
        res.status(401).send('Authentication failed');
    }
});

module.exports = router;


router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Server Error');
        }
       
        res.status(200).send('Logged out successfully');
    });
});

router.get('/current-client', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('No active session');
    }

    try {
        const client = await Client.findById(req.session.userId).select('-rating -password');
        if (!client) {
            return res.status(404).send('Client not found');
        }
        res.json(client);
    } catch (error) {
        console.error('Error fetching client data:', error);
        res.status(500).send('Error fetching client data');
    }
});


module.exports = router;
