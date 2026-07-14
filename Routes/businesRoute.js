import express from "express";
import { businessData } from "../Controller/businesController.js";
import { jwtAuthMiddle } from "../Jwt/token.js";

const router = express.Router();

router.post('/businessData', jwtAuthMiddle, businessData);

export default router;