import express from 'express';
import { businessPage, customerPage, currentUser } from '../Controller/protectController.js';
import { authorizeRole, jwtAuthMiddle } from "../Jwt/token.js";

const router = express.Router();

router.get('/business', jwtAuthMiddle, authorizeRole("Business"), businessPage);
router.get('/customer', jwtAuthMiddle, authorizeRole("Customer"), customerPage);
router.get("/me", jwtAuthMiddle, currentUser);

export default router