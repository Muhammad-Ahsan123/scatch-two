const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        req.flash("error", "You need to login first");
        return res.redirect('/');
    }
    
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        req.user = await userModel.findOne({ email: decodedToken.email }).select("-password");
        next();
    } catch (err) {
        req.flash("error", err.message);
        return res.redirect('/');
    }
};
