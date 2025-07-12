import express from "express";
import { registerUser, loginUser , getPublicUserById, getAllPublicUsers} from "../controllers/user.controller.js";
import { upload } from "../Middlewares/multer.middleware.js";

const router = express.Router();

// Register route with file upload
router.post("/register", upload.single("profilePic"), registerUser);

// Login route
router.post("/login", loginUser);

router.get("/getuser/:userId", getPublicUserById);
router.get("/all", getAllPublicUsers);
export default router;