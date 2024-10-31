// Route to call apis

import { Router } from "express";
import { signup } from "../controllers/AuthController.js";
import { login } from "../controllers/AuthController.js";
import { updateProfile } from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";
import { getUserInfo } from "../controllers/AuthController.js";
import { addProfileImage, removeProfileImage } from "../controllers/AuthController.js";
import { logout } from "../controllers/AuthController.js";
import multer from "multer";

const authRoutes = Router();
const upload = multer({ dest: "uploads/profiles/"});

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo); // can have multiple middlewares here, like this.
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post("/add-profile-image", verifyToken, upload.single("profile-image"), addProfileImage);
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);
authRoutes.post("/logout", logout);

export default authRoutes;