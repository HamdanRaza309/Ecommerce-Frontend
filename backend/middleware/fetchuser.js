const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'hamdanhrhd';

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ error: "Access denied, no token provided." });
    }

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        console.log('Decoded Token:', decodedToken); // Debug line
        req.user = decodedToken.user;
        next();
    } catch (error) {
        res.status(401).json({ error: "Invalid token, authentication failed." });
    }
};

module.exports = fetchuser;
