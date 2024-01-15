const mongoose = require("mongoose");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const bcrypt = require("bcrypt");

const createUser = async(req, res) => {
    const { username, password, email } = req.body;
    try {
        const userInput = new User({ username, password, email });
        const user = await userInput.save();
        const token = jwt.sign({ username: user.username, userId: user._id },
            secretKey);
        return res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
        return res.status(401).json({ message: "User registering failed", status: "error" });
    }
}

const loginUser = async(req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) {
            return res.status(401).json({ message: "username/password cannot be empty", token });
        }
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(401).json({ message: "username is invalid", token });
        }

        //if password is match
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "username/password invalid", token });
        }
        const token = jwt.sign({ username: user.username, userId: user._id },
            secretKey);
        return res.status(201).json({ message: "login success", token });
    } catch (error) {
        return res.status(401).json({ message: "Auth Failed", token });
    }
}

const getUser = async(req, res) => {
    const id = req.body.id;
    const user = await User.findById(id).select("-password");
    return res.status(201).json({ user });
}

module.exports = { createUser, loginUser, getUser };