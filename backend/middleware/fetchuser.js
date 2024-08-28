const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_KEY || 'hamdanhrhd';

// Middleware function to fetch user from JWT token
const fetchuser = (req, res, next) => {

    // Get the token from the request header
    const token = req.header('auth-token');
    if (!token) {
        // If no token is found, return an unauthorized error
        return res.status(401).json({ error: "Access denied, please use a valid token." });
    }

    try {
        // Verify the token using the secret key
        const data = jwt.verify(token, JWT_SECRET);

        // Attach the user data to the request object
        req.user = data.user;
        next();
    } catch (error) {
        // If token verification fails, return an error response
        res.status(401).json({ error: "Invalid token, authentication failed." });
    }
}

module.exports = fetchuser;
