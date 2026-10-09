import authService from "../services/auth.service.js";

async function signup(req, res) {
    const accessToken = await authService.signup(req.body);
    res.json(accessToken);
}

async function login(req, res){
    const accessToken = await authService.login(req.body);
    res.json(accessToken);
}

const authController = {
    signup, login
};

export default authController;