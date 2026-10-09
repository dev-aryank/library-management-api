import { Router } from "express";
import memberController from "../controllers/member.controller.js";
import authenticate from "../middlewares/authentication.middleware.js";
import isAdmin from "../middlewares/authorization.middleware.js";

const router = Router();

// router.post("/", memberController.createMember);

router.get("/", authenticate, isAdmin, memberController.getAllMembers);

router.get("/:id", memberController.getMemberById);

router.patch("/:id", memberController.updateMember);

router.delete("/:id", memberController.deleteMember);

export default router;