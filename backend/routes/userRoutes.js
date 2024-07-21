import express from 'express';
import protectedRoute from '../middleware/protectedRaout.js';
import { getUsersForSidebar } from '../controllers/usercontrollers.js';

const router = express.Router();

router.get('/', protectedRoute, getUsersForSidebar)

export default router;