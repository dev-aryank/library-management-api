import Member from "../models/member.model.js";
import AppError from "../utils/AppError.js";


async function getAllMembers() {
    const members = await Member.find({ isActive: true });
    return members;
}

async function getMemberById(memberId) {
    const member = await Member.findOne({ _id: memberId, isActive: true })
                               .select("-__v -isActive -createdAt -updatedAt");
    if (!member) {
        throw new AppError("Member not found", 404);
    }
    return member;
}

async function updateMember(memberId, memberData) {
    const updateData = { ...memberData };
    delete updateData.isActive;

    const member = await Member.findOneAndUpdate(
        { _id: memberId, isActive: true },
        updateData,
        { new: true, runValidators: true }
    ).select("-__v -isActive");

    if (!member) {
        throw new AppError("Member not found", 404);
    }
    return member;
}

async function deleteMember(memberId) {
    const member = await Member.findOneAndUpdate(
        { _id: memberId, isActive: true },
        { isActive: false },
        { new: true }
    ).select("-__v -isActive");

    if (!member) {
        throw new AppError("Member not found", 404);
    }
    return member;
}

const memberService = {
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember
};

export default memberService;
