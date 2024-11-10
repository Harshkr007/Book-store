import jwt from "jsonwebtoken";

const verifyAdminToken = (req,res,next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if(!token){
        return res.status(401).json({
            message: "Unauthorized",
        });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err){
            return res.status(401).json({
                message: "Invalid token",
            });
        }
        if(decoded.role !== 'admin'){
            return res.status(403).json({
                message: "Forbidden",
            });
        }
        req.user = decoded;
        next();
    });
}

export default verifyAdminToken;