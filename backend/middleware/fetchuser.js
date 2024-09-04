const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'hamdanhrhd';

const fetchuser = (req, res, next) => {
    const authHeader = req.header('auth-token');
    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied, no token provided.' });
    }

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
