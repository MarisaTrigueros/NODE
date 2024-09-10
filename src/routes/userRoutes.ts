import { Router } from "express";
import { signupUser, loginUser, allUsers } from "../controller/userController";

const router = Router();

router.get("/allUsers", allUsers),
router.post("/signup", signupUser);
router.post("/login", loginUser);

export default router;