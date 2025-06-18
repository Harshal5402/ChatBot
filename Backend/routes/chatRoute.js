import express from "express";
import { saveMessage, getMessages} from "../controller/chatController.js";
import authMiddleware from "../middleware/auth.js";

const chatRouter = express.Router();

chatRouter.post("/savemessage", authMiddleware, saveMessage);
chatRouter.get("/message",authMiddleware, getMessages);

export default chatRouter;
