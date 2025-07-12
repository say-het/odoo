// routes/skill.routes.js

import express from "express";
import { verifyJWT } from "../Middlewares/auth.middleware.js";
import {
  createSwapRequest,
  deleteSwapRequest,
  getSentSwapRequests,
  getReceivedSwapRequests
} from "../controllers/SwapRequest.controller.js";

const router = express.Router();

// Create a new swap request
router.post("/addreq", createSwapRequest);

// Delete a swap request by ID
router.delete("/delete/:id", deleteSwapRequest);

// Get all swap requests sent by a user
router.get("/sent/:userId", getSentSwapRequests);

// Get all swap requests received by a user
router.get("/received/:userId", getReceivedSwapRequests);

export default router;
