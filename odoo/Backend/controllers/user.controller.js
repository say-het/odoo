import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";
import { User } from "../models/User.model.js";
import { UserSkills } from "../models/UserSkills.model.js";
import { ApiError } from "../Utils/ApiError.js";
import { AsyncHandler } from "../Utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../Utils/Cloudinary.js";

// ---------- Register User ----------
export const registerUser = AsyncHandler(async (req, res) => {
  const { name, email, password, location, availability } = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, Email and Password are required");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User with this email already exists");
  }

  let profilePicUrl = null; // Initialize as null

  if (req.file) {
    try {
      console.log("File received:", req.file); // Debug log
      const localPath = req.file.path;
      console.log("Local path:", localPath); // Debug log
      
      // Check if file exists before uploading
      if (!fs.existsSync(localPath)) {
        throw new ApiError(500, "Uploaded file not found");
      }
      
      const cloudinaryResponse = await uploadOnCloudinary(localPath);
      console.log("Cloudinary response:", cloudinaryResponse); // Debug log

      // Clean up local file after upload attempt
      if (fs.existsSync(localPath)) {
        fs.unlinkSync(localPath);
      }

      if (!cloudinaryResponse?.secure_url) {
        throw new ApiError(500, "Failed to upload profile picture to Cloudinary");
      }

      profilePicUrl = cloudinaryResponse.secure_url;
    } catch (error) {
      console.error("Profile picture upload error:", error);
      // Clean up local file if it exists
      if (req.file?.path && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      throw new ApiError(500, "Failed to process profile picture");
    }
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    location,
    availability,
    profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWFaFKG08hKUN7BKpPlEq3dzSRjxAie-jJlQ&s", // Will be null if no file uploaded
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      location: user.location,
      profilePic: user.profilePic,
    },
  });
});

// ---------- Login User ----------
export const loginUser = AsyncHandler(async (req, res) => {
  console.log(req.body)
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and Password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const accessToken = jwt.sign(
    { _id: user._id },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" }
  );

  res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        location: user.location,
        profilePic: user.profilePic,
        role: user.role,
      },
    });
});

export const getPublicUserById = AsyncHandler(async (req, res) => {
  const { userId } = req.params;
  console.log(userId)

  const user = await User.findById(userId).select(
    "name location profilePic availability isPublic isBanned role rating totalResolved"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role !== "user") {
    throw new ApiError(403, "Only user-type profiles are accessible");
  }

  const userSkills = await UserSkills.findOne({ user: userId })
    .populate("offered", "name description")
    .populate("wanted", "name description");

  res.status(200).json({
    success: true,
    data: {
      _id: user._id,
      name: user.name,
      location: user.location,
      profilePic: user.profilePic,
      availability: user.availability,
      isPublic: user.isPublic,
      isBanned: user.isBanned,
      rating : user.rating,
      totalResolved : user.totalResolved,
      skills: {
        offered: userSkills?.offered || [],
        wanted: userSkills?.wanted || []
      }
    }
  });
});


// ---------- Get All Public Users ----------
export const getAllPublicUsers = AsyncHandler(async (req, res) => {
  const users = await User.find({ role: "user" }).select(
    "_id name location profilePic availability isPublic isBanned rating totalResolved"
  );

  const userIds = users.map((u) => u._id);

  const allSkills = await UserSkills.find({ user: { $in: userIds } })
    .populate("offered", "name description")
    .populate("wanted", "name description");

  // Map userId -> skills for easy lookup
  const skillsMap = new Map();
  allSkills.forEach((entry) => {
    skillsMap.set(entry.user.toString(), {
      offered: entry.offered || [],
      wanted: entry.wanted || [],
    });
  });
  const result = users.map((user) => ({
    _id: user._id,
    name: user.name,
    location: user.location,
    profilePic: user.profilePic,
    availability: user.availability,
    isPublic: user.isPublic,
    isBanned: user.isBanned,
    rating: user.rating,
    totalResolved: user.totalResolved,
    skills: skillsMap.get(user._id.toString()) || { offered: [], wanted: [] },
  }));

  // console.log(result)
  res.status(200).json({
    success: true,
    users: result,
  });
}); 