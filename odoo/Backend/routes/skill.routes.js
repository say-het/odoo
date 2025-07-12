// routes/skill.routes.js
import express from "express";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import { createUserSkillEntries } from "../controllers/skill.controller.js";

const router = express.Router();

router.post("/userskills/add", createUserSkillEntries);

export default router;
