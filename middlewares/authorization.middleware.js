import AppError from "../utils/AppError.js";

function isAdmin(req, res, next){

    if(req.user.role !== "ADMIN"){
        throw new AppError("Admin access denied", 403);
    }

    next();

}

export default isAdmin;