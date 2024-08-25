const express = require('express');
const cookie = require('cookie-parser');
const bcrypt = require('bcrypt');
const ownerModel = require('../models/owner-model');
const ownerLoggedIn = require('../middleware/ownerLoggedIn');
const { generateToken } = require('../utils/generateToken');
const router = express.Router();

router.use(cookie());

// Log the environment mode
console.log('NODE_ENV', process.env.NODE_ENV);

// Route for owner creation (only in development mode)
if (process.env.NODE_ENV === "development") {
    router.post('/create', async (req, res) => {
        const { fullname, email, password } = req.body;

        try {
            const ownerExists = await ownerModel.find();
            if (ownerExists.length > 0) {
                req.flash("error", 'You have no permission to create owner');
                return res.redirect('/owner-login');
            }

            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            await ownerModel.create({ fullname, email, password: hash });

            req.flash("success", 'Owner Created');
            return res.redirect('/owner/adminpanel');
        } catch (error) {
            console.error('Error creating owner:', error);
            req.flash("error", 'An error occurred while creating the owner.');
            return res.redirect('/owner-login');
        }
    });
}

// Route for owner creation in non-development mode
router.post('/create', (req, res) => {
    req.flash("error", 'You have no permission to create owner');
    return res.redirect('/owner-login');
});

// Admin panel route with authentication middleware
router.get('/adminpanel', ownerLoggedIn, (req, res) => {
    const error = req.flash("error");
    const success = req.flash("success");
    res.render('createproducts', { error, success });
});

// Owner login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const owner = await ownerModel.findOne({ email });
        if (!owner) {
            req.flash("error", 'Email or Password is incorrect');
            return res.redirect('/owner-login');
        }

        const isPasswordMatch = await bcrypt.compare(password, owner.password);
        if (!isPasswordMatch) {
            req.flash("error", 'Email or Password is incorrect');
            return res.redirect('/owner-login');
        }

        const token = generateToken(owner);
        res.cookie('admintoken', token);
        req.flash('success', 'Owner is successfully logged in');
        return res.redirect('/owner/adminpanel');
    } catch (error) {
        console.error('Error logging in owner:', error);
        req.flash("error", 'An error occurred during login.');
        return res.redirect('/owner-login');
    }
});

module.exports = router;
