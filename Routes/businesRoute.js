import express from "express";
import { businessData, getBusinesProfile } from "../Controller/businesController.js";
import { jwtAuthMiddle } from "../Jwt/token.js";

const router = express.Router();

router.post('/businessData', jwtAuthMiddle, businessData);
router.get('/businessProfile',jwtAuthMiddle, getBusinesProfile);

export default router;