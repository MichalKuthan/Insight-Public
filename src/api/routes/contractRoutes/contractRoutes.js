const express = require('express');
const router = express.Router();
const Contract = require('../../models/Contract.js');
const multer = require('multer');
const fs = require('fs'); // Required for file deletion

// Set up multer for file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
       
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

// POST route to create a new contract with file upload
router.post('/client/contracts', upload.array('contractFile'), async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Authentication required');
    }

    const newContractData = {
        ...req.body,
        clientId: req.session.userId,
        filePaths: req.files.map(file => file.path) 
    };

    try {
        const newContract = new Contract(newContractData);
        await newContract.save();
        res.status(201).json(newContract);
    } catch (error) {
        console.error('Error creating contract:', error);
        res.status(500).send('Internal Server Error');
    }
});


// GET route to fetch all contracts
router.get('/client/contracts', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Authentication required');
    }

    try {
        const contracts = await Contract.find({ clientId: req.session.userId });
        res.json(contracts);
    } catch (error) {
        console.error('Error fetching contracts:', error);
        res.status(500).send('Internal Server Error');
    }
});

// DELETE route to delete a contract by ID and its associated file
router.delete('/admin/contracts/:id', async (req, res) => {
    try {
        const contract = await Contract.findByIdAndDelete(req.params.id);
        if (contract) {
            // Delete the associated file if it exists
            if (contract.filePath && fs.existsSync(contract.filePath)) {
                fs.unlinkSync(contract.filePath);
            }
            res.status(200).send(`Contract with id ${req.params.id} and its file deleted successfully.`);
        } else {
            res.status(404).send('Contract not found');
        }
    } catch (error) {
        console.error('Error deleting contract:', error);
        res.status(500).send('Error deleting contract');
    }
});

// Endpoint to delete only a specific file associated with a contract
router.delete('/admin/contracts/:id/file', async (req, res) => {
    const { id } = req.params;
    const filePathToDelete = req.query.filePath;

    try {
        const contract = await Contract.findById(id);
        if (!contract) {
            return res.status(404).send('Contract not found');
        }

        if (contract.filePaths.includes(filePathToDelete)) {
            // Delete the file from the filesystem
            fs.unlinkSync(filePathToDelete);

            // Remove the file path from the contract's filePaths array
            contract.filePaths = contract.filePaths.filter(filePath => filePath !== filePathToDelete);

            // Save the updated contract
            await contract.save();

            res.send(`File deleted successfully.`);
        } else {
            res.status(404).send('File not found in contract');
        }
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).send('Internal Server Error');
    }
});


// PUT route to update a contract by ID with file handling
router.put('/admin/contracts/:id', upload.array('contractFile'), async (req, res) => {
    const { id } = req.params;

    try {
        const contract = await Contract.findById(id);
        if (!contract) {
            return res.status(404).send('Contract not found');
        }

        // Update contract data
        Object.keys(req.body).forEach(key => {
            contract[key] = req.body[key];
        });

        // Handle new file uploads
        if (req.files && req.files.length > 0) {
            // Optionally delete old files here
            const filePaths = req.files.map(file => file.path);
            contract.filePaths = [...contract.filePaths, ...filePaths]; 
        }

        await contract.save();
        res.status(200).json(contract);
    } catch (error) {
        console.error('Error updating contract:', error);
        res.status(500).send('Internal Server Error');
    }
});

// This route is used to fetch contracts for the logged-in client
router.get('/client/contracts', async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).send('Authentication required');
    }

    try {
        const contracts = await Contract.find({ clientId: req.session.userId });
        res.json(contracts);
    } catch (error) {
        console.error('Error fetching contracts:', error);
        res.status(500).send('Error fetching contracts');
    }
});

module.exports = router;
