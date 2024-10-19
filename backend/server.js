const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session'); // Import express-session

// Routes
const contactRoutes = require('./routes/contactRoutes');
const jobRoutes = require('./routes/jobRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();


app.use(cors({
  origin: 'http://localhost:3000', // Adjust this to your frontend's origin
  credentials: true, // Enable credentials if you are using credentials in your fetch request
}));


app.use(cookieParser());
app.use(express.json());

// Session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your-secret-key', // Use a strong secret for production
    resave: false,
    saveUninitialized: false, // Do not save uninitialized sessions
    cookie: { 
        secure: process.env.NODE_ENV === 'production', // Set secure cookies in production
        maxAge: 1000 * 60 * 60 * 24 // Cookie will expire in 1 day
    }
}));

// Routes Middleware
app.use('/api/contact', contactRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
