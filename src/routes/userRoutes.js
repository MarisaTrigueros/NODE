"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controller/userController");
const router = (0, express_1.Router)();
router.get("/allUsers", userController_1.allUsers),
    router.post("/signup", userController_1.signupUser);
router.post("/login", userController_1.loginUser);
exports.default = router;
