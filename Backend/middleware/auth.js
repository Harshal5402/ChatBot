import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 
    console.log("Extracted Token:", token); 
    
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Authorization token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.id; 
        console.log("Decoded Token:", decoded);  
        console.log("User ID:", req.userId);
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default authMiddleware;