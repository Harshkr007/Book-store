import express from 'express';
import { handleUserAdmin, handleUserRegistration } from '../controllers/user.controller.js';

const router = express.Router();


router.post('/register',handleUserRegistration);
router.post('/admin',handleUserAdmin);

export default router;