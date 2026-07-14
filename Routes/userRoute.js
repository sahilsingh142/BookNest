import express from "express";
import { signup, login, businessPage, customerPage, currentUser, logout } from "../Controller/userController.js";
import { authorizeRole, jwtAuthMiddle } from "../Jwt/token.js";

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/business', jwtAuthMiddle,authorizeRole("Business"), businessPage);
router.get('/customer', jwtAuthMiddle, authorizeRole("Customer"), customerPage);
router.get("/me", jwtAuthMiddle, currentUser);
router.post("/logout",logout);

export default router