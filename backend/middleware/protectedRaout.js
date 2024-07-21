import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectedRoute = async(req, res, next) => {
    try{
        console.log(req.cookies.jwt)
        const token = req.cookies.jwt;
      
        if(!token){
            res.status(401).json({error: "Unauthorized - no token provided "})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded){
            res.status(401).json({error: "Unauthorized - no token provided"})
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            res.status(404).json({error: "User not found"})
        }

        req.user = user;

        next()
    }
    catch(error){
        console.log("Error in protectedRoute middleware", error.message)
        res.status(500).json({error: "Internal server error"})
    }

}

export default protectedRoute;