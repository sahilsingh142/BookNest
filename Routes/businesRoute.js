import express from "express";
import { businessData, getAllBusniessData, getBusinesProfile, getStatusData, updateBusiness, updateStatus } from "../Controller/businesController.js";
import { authorizeRole, jwtAuthMiddle } from "../Jwt/token.js";

const router = express.Router();

router.post('/businessData', jwtAuthMiddle, businessData);
router.get('/businessProfile',jwtAuthMiddle, getBusinesProfile);
router.get('/all',jwtAuthMiddle,authorizeRole("Customer"),getAllBusniessData);
router.put( "/updateBusiness", jwtAuthMiddle, authorizeRole("Business"), updateBusiness);
router.put('/updateStatus',jwtAuthMiddle,updateStatus);
router.get('/getStatusData',jwtAuthMiddle,getStatusData);

export default router;