import { Router } from "express";
import memberController from "../controllers/member.controller.js";
import validate from "../middlewares/validate.middleware.js";
import memberValidation from "../validations/member.validation.js";

const router = Router();

router.post("/", validate(memberValidation.createMember), memberController.createMember);

router.get("/", memberController.getAllMembers);

router.get("/:id", validate(memberValidation.memberId, "params"), memberController.getMemberById);

router.patch(
    "/:id",
    validate(memberValidation.memberId, "params"),
    validate(memberValidation.updateMember),
    memberController.updateMember
);

router.delete("/:id", validate(memberValidation.memberId, "params"), memberController.deleteMember);

export default router;