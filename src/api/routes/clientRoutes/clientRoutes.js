const express = require('express');
const router = express.Router();
const Client = require('../../models/Client'); 
const bcrypt = require('bcrypt');



router.post('/admin/clients', async (req, res) => {
    const { name, surname, password, phone, email, address, rating, role } = req.body;

    try {
        // Check for an existing client with the same email
        const existingClient = await Client.findOne({ email });
        if (existingClient) {
            return res.status(400).send('A client with this email already exists.');
        }

      

        const client = new Client({ name, surname,  password, phone, email, address, rating, role });
        await client.save();
        res.status(201).send('Client created successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error creating client');
    }
});

router.get('/admin/clients', async (req, res) => {
    try {
        const clients = await Client.find({});
        res.json(clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
        res.status(500).send('Error fetching clients');
    }
});

router.delete('/admin/clients/:id', async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        if (client) {
            res.status(200).send(`Client with id ${req.params.id} deleted successfully.`);
        } else {
            res.status(404).send('Client not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting client');
    }
});

router.put('/admin/clients/:id', async (req, res) => {
    const { id } = req.params;
    const { newPassword, ...updateData } = req.body;

    try {
        const client = await Client.findById(id);
        if (!client) {
            return res.status(404).send('Client not found');
        }

        // If new password is provided, directly set it because hashing is handled in the model
        if (newPassword) {
            updateData.password = newPassword;
        }

        // Update client data
        Object.assign(client, updateData);
        await client.save();

        res.status(200).json(client);
    } catch (error) {
        console.error('Error updating client:', error);
        res.status(500).send('Error updating client');
    }
});

// Route to update client profile
router.put('/client/update-profile', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Authentication required');
    }

    const { currentPassword, newPassword, ...updateData } = req.body;

    try {
        const client = await Client.findById(req.session.userId);
        if (!client) {
            return res.status(404).send('Client not found');
        }

        // Verify current password
        const isMatch = await bcrypt.compare(currentPassword, client.password);
        if (!isMatch) {
            return res.status(401).send('Current password is incorrect');
        }

        // If new password is provided, update it
        if (newPassword && isMatch) {
            client.password = newPassword; 
        }

        // Update other fields
        Object.assign(client, updateData);
        await client.save();

        res.send('Profile updated successfully');
    } catch (error) {
        console.error('Error updating client profile:', error);
        res.status(500).send('Error updating client profile');
    }
});


module.exports = router;
