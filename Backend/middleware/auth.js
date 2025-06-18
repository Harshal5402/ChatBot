// import jwt from 'jsonwebtoken';

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith('Bearer ')) {
//     return res.status(401).json({ message: 'Authorization token missing' });
//   }

//   const token = authHeader.split(' ')[1];
//    if (!token) return res.status(401).json({ message: 'Unauthorized: Token missing' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded JWT:", decoded);
//     req.userId = decoded.userId;  
//     next();
//   } catch (error) {
//     console.log("JWT Verify Error:", error.message); 
//     return res.status(401).json({ message: 'Invalid token' });
//   }
// };

// export default authMiddleware;





import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // "Bearer token"
    console.log("Extracted Token:", token); // Check token value
    
    
    if (!token) {
        return res.status(401).json({ success: false, message: 'Authorization token missing' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
        req.userId = decoded.id; // Ensure `userId` is correctly set here
        console.log("Decoded Token:", decoded);  // Debugging
        console.log("User ID:", req.userId);
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error.message);
        res.status(403).json({ success: false, message: 'Invalid or expired token' });
    }
};

export default authMiddleware;