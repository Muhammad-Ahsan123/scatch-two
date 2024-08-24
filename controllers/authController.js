const bcrypt = require('bcrypt');
const userModel = require('../models/user-model');
const { generateToken } = require('../utils/generateToken');
const productModel = require('../models/product-model');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            req.flash('error', 'User not found');
            return res.redirect('/');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = generateToken(user);
            res.cookie('token', token);
            req.flash('success', 'Successfully logged in');
            return res.redirect('/shop');
        } else {
            req.flash('error', 'Email or password is incorrect');
            return res.redirect('/');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const registerUser = async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            req.flash('error', 'User already exists');
            return res.redirect('/');
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const newUser = await userModel.create({ fullname, email, password: hash });
        const token = generateToken(newUser);

        res.cookie('token', token);
        req.flash('success', 'User successfully created');
        res.redirect('/shop');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

const logoutUser = (req, res) => {
    res.cookie('token', '', { expires: new Date(0) });
    res.redirect('/');
};

const deleteAllProducts = async (req, res) => {
    try {
        await productModel.deleteMany({});
        res.redirect('/owner/adminpanel');
    } catch (error) {
        console.error('Error deleting all products:', error);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = { registerUser, loginUser, logoutUser, deleteAllProducts };