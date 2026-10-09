import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

function authenticate(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer ")){
        throw new AppError("Login Please", 401);
    }

    const token = authHeader.split(" ")[1];

    try{
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = {
            userId: payload.userId,
            role: payload.role
        };

        next();
    } catch(error){
        throw new AppError("Invalid or expired token", 401);
    }
}

export default authenticate;