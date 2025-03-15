import express from "express"
import { getUsers, addUser, getUserById, updateUser, login } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/adduser", addUser);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);
router.post("/login",login);

export default router;