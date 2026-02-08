const Contact = require('../models/Contact');

exports.submitContactForm = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Basic Validation
        if (!name || !email || !message) {
            return res.status(400).json({ success: false, error: 'All fields are required.' });
        }

        // Save to DB
        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        res.status(201).json({
            success: true,
            message: 'Message received. System will process shortly.'
        });
    } catch (error) {
        console.error('Contact submission error:', error);
        res.status(500).json({
            success: false,
            error: 'Internal Server Error'
        });
    }
};
