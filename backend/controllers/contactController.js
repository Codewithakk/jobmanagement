const Contact = require('../models/Contact');

exports.createContact = async (req, res) => {
    const { name, email, subject, message } = req.body;
    
    try {
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();
        res.status(201).json({ message: 'Contact form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error submitting contact form' });
    }
};
