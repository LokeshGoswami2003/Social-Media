const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }

        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return res.status(409).send("user is already registered");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            user,
        });
    } catch (error) {
        console.log(error);
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).send("All fields are required");
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send("user is not registered");
        }

        const matched = await bcrypt.compare(password, user.password);

        if (!matched) {
            return res.status(403).send("incorrect password");
        }

        const accessToken = generateAccessToken({
            _id: user._id,
            email: user.email,
        });

        return res.json({ accessToken });
    } catch (error) {
        console.log(error);
    }
};

//internal functions
const generateAccessToken = (data) => {
    try {
        const token = jwt.sign(data, "hhyugyugyufgtfo");
        return token;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    signupController,
    loginController,
};
