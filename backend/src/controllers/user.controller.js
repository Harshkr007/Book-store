import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const handleUserRegistration = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        console.log(`${username}, ${email}, ${password}`);
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        const newUser = await User.create({
            username,
            email,
            password,
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: newUser,
        });
    } catch (error) {
        return res.status(500).json({
            message: "User registration failed",
            error: error.message
        });
    }
}
const handleUserAdmin = async (req, res) => {
    const {username, password} = req.body;
    try {
        const admin = await User.findOne({ username });
        
        if(!admin) {
            return res.status(404).json({
                message: "Admin not found"
            });
        }
        
        if(admin.role !== 'admin') {
            return res.status(403).json({
                message: "Not authorized as admin"
            });
        }

        // Add password comparison
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if(!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({
            id: admin._id,
            username: admin.username,
            role: admin.role,
        }, process.env.JWT_SECRET_KEY, 
        {
            expiresIn: "1d",
        });

        return res.status(200).json({
            message: "Authentication successful",
            token,
            user: {
                username: admin.username,
                role: admin.role
            }
        });
    } catch (error) {
        console.error('Failed to login as admin', error);
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
}

/*
const handleUserLogin = async (req,res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if(!user){
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }

        return res.status(200).json({
            message: "User logged in successfully",
            user: user,
        });
    } catch (error) {
        console.error(error);
    }
}
*/


export {
    handleUserRegistration,
    handleUserAdmin,
}