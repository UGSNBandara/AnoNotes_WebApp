import express from "express";
import {addMessage, getAllMessages, getMessgesByUser} from "../controllers/messageController.js"

const router = express.Router();

router.get("/", getAllMessages);
router.post("/add", addMessage);
router.get("/get/:id", getMessgesByUser);

export default router;