import express from "express"
import { getUsers, addUser, getUserById, updateUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.post("/adduser", addUser);
router.get("/:id", getUserById);
router.put("/update/:id", updateUser);


export default router;