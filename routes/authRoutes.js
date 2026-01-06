import express from 'express';
import { register, verifyOTP, login, resendOTP } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/register
router.post('/register', register);

// POST /api/auth/verify-otp
router.post('/verify-otp', verifyOTP);

// POST /api/auth/login
router.post('/login', login);

// POST /api/auth/resend-otp
router.post('/resend-otp', resendOTP);

export default router;
