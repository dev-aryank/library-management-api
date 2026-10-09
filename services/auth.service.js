import Member from "../models/member.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";

async function signup(userData) {
    const password = userData.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;

    const user = await Member.create(userData);
    const accessToken = generateAcessToken(user);

    return {accessToken: accessToken};
}


async function login(userData) {
    const password = userData.password;
    const email = userData.email;

    const user = await Member.findOne({ email, isActive: true });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new AppError("Invalid email or password", 401);
    }

    const accessToken = generateAcessToken(user);
    return { accessToken };
}

function generateAcessToken(userData){
    const userPayload = {userId: userData._id, role: userData.role};
    const token = jwt.sign(userPayload, process.env.JWT_ACCESS_SECRET, { expiresIn: '15m' });
    return token;
}

// function generateRefre

const authService = {
    signup,
    login
};

export default authService;