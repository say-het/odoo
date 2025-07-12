// controllers/SwapRequest.controller.js

import { SwapRequest } from "../models/SwapRequest.model.js";
import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";

// Create a new swap request
export const createSwapRequest = AsyncHandler(async (req, res) => {
  const { toUser, skillsOffered, skillsRequested } = req.body;
  const fromUser = req.user._id; // from verifyJWT middleware

  if (!toUser || !Array.isArray(skillsOffered) || !Array.isArray(skillsRequested)) {
    throw new ApiError(400, "toUser, skillsOffered[], and skillsRequested[] are required");
  }

  const newRequest = new SwapRequest({
    fromUser,
    toUser,
    skillsOffered,
    skillsRequested,
  });

  const savedRequest = await newRequest.save();

  res.status(201).json({
    success: true,
    message: "Swap request created",
    request: savedRequest,
  });
});


// Delete a swap request by ID
export const deleteSwapRequest = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id)

  const deleted = await SwapRequest.findByIdAndDelete(id);
  if (!deleted) throw new ApiError(404, "Swap request not found");

  res.status(200).json({
    success: true,
    message: "Swap request deleted",
  });
});

// Get all swap requests sent by a user
export const getSentSwapRequests = AsyncHandler(async (req, res) => {
  const { userId } = req.params;

  const requests = await SwapRequest.find({ fromUser: userId })
    .populate("toUser", "name profilePic")
    .populate("skillsOffered", "name")
    .populate("skillsRequested", "name");

  res.status(200).json({
    success: true,
    requests,
  });
});

// Get all swap requests received by a user
export const getReceivedSwapRequests = AsyncHandler(async (req, res) => {
  const { userId } = req.params;

  const requests = await SwapRequest.find({ toUser: userId })
    .populate("fromUser", "name profilePic")
    .populate("skillsOffered", "name")
    .populate("skillsRequested", "name");

  res.status(200).json({
    success: true,
    requests,
  });
});
