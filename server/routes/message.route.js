import express from "express"
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getAllUsers,  getMessagesBetweenTwoUsersByIds, sendMessageBetweenTwo } from "../controllers/message.controller.js";

const router = express.Router();


router.get("/users",protectRoute,getAllUsers)
router.get("/:id",protectRoute,getMessagesBetweenTwoUsersByIds)

router.post("/send/:id",protectRoute,sendMessageBetweenTwo)



export default router;