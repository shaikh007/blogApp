const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

module.exports.fetchUser = async(req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized access",
            status: "error",
        })
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "Unauthorized access",
                status: "error",
            });
        }
        req.user = decoded.user;
        next();
    });
};