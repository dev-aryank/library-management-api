import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

function authenticate(req, res, next){
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith("Bearer ")){
        throw new AppError("Unauthorized", 401);
    }

    const token = authHeader.split(" ")[1];

    try{
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = {
            id: payload._id
        };

        next();
    } catch(error){
        throw new AppError("Invalid or expired token", 401);
    }
}

export default authenticate;