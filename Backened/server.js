import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import { User } from './models/UserSchema.js'; // or adjust path as needed

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json()); // important to parse JSON body

// Connect to MongoDB
await mongoose.connect("mongodb://localhost:27017/todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Signup route
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already registered with this email' });
        }

        const newUser = new User({ name, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({message : err.message });
        }
        res.status(500).json({ message: 'Something went wrong' });
      }
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});