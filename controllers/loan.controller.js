import loanService from "../services/loan.service.js";

async function createLoan(req, res) {
    const userId = req.user.userId;
    const bookId = req.body.bookId;

    const loan = await loanService.createLoan(userId, bookId);
    res.json(loan);
}

const loanController = {createLoan};
export default loanController;