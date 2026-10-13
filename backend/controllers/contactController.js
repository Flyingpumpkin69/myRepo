const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

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

        // Setup Nodemailer transporter
        // User needs to provide EMAIL_USER and EMAIL_PASS in their .env
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or another provider
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER, // The sender address
            to: 'yashrajsinh3674@gmail.com', // The destination address
            subject: `New Portfolio Contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        };

        // Try sending the email, but don't fail the request if the email fails (e.g. missing credentials during development)
        try {
            if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
                await transporter.sendMail(mailOptions);
                console.log('✅ Contact email sent successfully');
            } else {
                console.log('⚠️ Email not sent: EMAIL_USER or EMAIL_PASS not set in .env');
            }
        } catch (emailError) {
            console.error('❌ Failed to send email:', emailError);
            // We still return 201 because it was saved to DB successfully
        }

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
