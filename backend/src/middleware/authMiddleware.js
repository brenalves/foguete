const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const { token } = req.cookies || {};
    
    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token.' });
    }
}

const authenticateAdmin = (req, res, next) => {
    const { user } = req;

    if (!user || !user.admin) {
        return res.status(403).json({ error: 'Access denied. Admins only.' });
    }

    next();
}

module.exports = {
    authenticateToken
}