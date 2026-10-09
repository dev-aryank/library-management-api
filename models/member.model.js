import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            trim: true
        },
        isActive: {
            type: Boolean,
            default: true
        },
        role: {
            type: String,
            enum: ["MEMBER", "ADMIN"],
            default: "MEMBER"
        }
    },
    {
        timestamps: true
    }
);

const Member = mongoose.model("Member", memberSchema);

export default Member;