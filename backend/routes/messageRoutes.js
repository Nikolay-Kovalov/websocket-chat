import express from 'express';
import { getMessages, sendMessage } from '../controllers/messagecontrollers.js';
import protectedRoute from '../middleware/protectedRaout.js';

const router = express.Router();

router.get('/:id', protectedRoute, getMessages)
router.post('/send/:id', protectedRoute, sendMessage)

export default router;