import memberService from "../services/member.service.js";

async function createMember(req, res) {
    const member = await memberService.createMember(req.body);
    res.status(201).json(member);
}

async function getAllMembers(req, res) {
    const members = await memberService.getAllMembers();
    res.json(members);
}

async function getMemberById(req, res) {
    const member = await memberService.getMemberById(req.params.id);
    res.json(member);
}

async function updateMember(req, res) {
    const member = await memberService.updateMember(req.params.id, req.body);
    res.json(member);
}

async function deleteMember(req, res) {
    const member = await memberService.deleteMember(req.params.id);
    res.json(member);
}

const memberController = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember
};

export default memberController;