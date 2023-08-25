import express from "express";
import { getUserData, changePassword, register, login, logout, update } from "../controllers/sessionController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import multer, { diskStorage } from "multer";
import { extname } from "path";

const router = express.Router();

let storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profilePic/");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
});

router.get("/getUserData", isAuthenticated, getUserData);

router.put("/changePassword", isAuthenticated, changePassword);

router.post("/register", upload.single("profilePic"), register);

router.post("/login", login);

router.get("/logout", logout);

router.put("/update", isAuthenticated, upload.single("image"), update);

export default router;