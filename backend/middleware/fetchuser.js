const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'hamdanhrhd';

const fetchuser = (req, res, next) => {
    // Retrieve the token from the Authorization header
    const authHeader = req.header('auth-token');
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied, no token provided.' });
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7, authHeader.length) : authHeader;

    try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        // console.log('Decoded Token:', decodedToken); 
        req.user = decodedToken.user;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token, authentication failed.' });
    }
};

module.exports = fetchuser;
