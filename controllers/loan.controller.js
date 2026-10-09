import loanService from "../services/loan.service.js";

async function createLoan(req, res) {
    const userId = req.user.userId;
    const bookId = req.body.bookId;

    const loan = await loanService.createLoan(userId, bookId);
    res.json(loan);
}

async function getMyLoans(req, res) {
    const userId = req.user.userId;
    const status = req.query.status;
    const allMyLoans = await loanService.getMyLoans(userId, status);
    res.json(allMyLoans);
}

async function returnLoan(req, res) {
    const userId = req.user.userId;
    const loanId = req.params.loanId;
    const loan = await loanService.returnLoan(userId, loanId);
    res.json(loan);
}


const loanController = {createLoan, getMyLoans, returnLoan};
export default loanController;