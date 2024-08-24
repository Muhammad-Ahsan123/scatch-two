const jwt = require("jsonwebtoken");
const ownerModel = require("../models/owner-model");

module.exports = async function (req, res, next) {
    const token = req.cookies.admintoken;
    if (!token) {
        req.flash("error", "You need to login first");
        return res.redirect('/owner-login');
    }
    
    try {
        jwt.verify(token, process.env.JWT_KEY);
        req.user = await ownerModel.findOne({ email: decodedToken.email }).select("-password");
        next();
    } catch (err) {
        req.flash("error", err.message);
        return res.redirect('/owner-login');
    }
};
