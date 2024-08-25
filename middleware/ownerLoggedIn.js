const ownerModel = require("../models/owner-model");
const jwt = require("jsonwebtoken");

module.exports = async function (req, res, next) {
    const token = req.cookies.admintoken;
    
    if (!token) {
        req.flash("error", "You need to login first");
        return res.redirect('/owner-login');
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_KEY);
        const user = await ownerModel.findOne({ email: decodedToken.email }).select("-password");
        req.user = user;  // Uncomment if user is needed later in the request cycle
        next();
    } catch (err) {
        req.flash("error", err.message);
        return res.redirect('/owner-login');
    }
};
