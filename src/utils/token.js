import jwt from "jsonwebtoken"
import logger from "../config/logger.js"

//node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"    פקודה שמריצים בקונסול כדי לקבל מספר מוצפן רנדומלי 
export const generateToken = (payload) => {
    try {
        return jwt.sign(
            payload,
            process.env.JWT_SECRET ,
            { expiresIn: '24h' }
        );
    } catch (error) {
        logger.error("Token generation failed", { error: error.message });
        throw new Error("Token generation failed");
    }
};

export const verifyToken=(token)=>{
 try {
    return jwt.verify(token, process.env.JWT_SECRET)
 } catch (error) {
    logger.error("Token verification failed", { error: error.message });
    throw new Error("Invalid token");
 }
}
export const authenticateToken=async (req,res,next)=>{
    try {
        const authHeader=req.header('x-auth-token')
        if(!authHeader){
            return res.status(401).json({
                status: "error",
                message: "Access denied token is required"
            });
        }
        const token = authHeader.replace("Bearer ", "")

        const decoded = verifyToken(token)
        req.user = {
            id: decoded._id,
            email: decoded.email,
            isBusiness: decoded.isBusiness
        };
        
        next()
    } catch (error) {
        logger.error("Authentication failed", {
            error: error.message,
            metadata: {
                action: "AuthenticateToken",
                token: req.header('x-auth-token')
            }
        });

        return res.status(401).json({
            status: "error",
            message: "Invalid token"
        });
    }
}