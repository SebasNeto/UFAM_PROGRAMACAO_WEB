// src/routes/authRoutes.ts
import { Router } from 'express';
import { signup, login, logout } from '../controllers/authController';

const router = Router();

router.get('/signup', (req, res) => res.render('signup'));
router.get('/login', (req, res) => res.render('login'));
router.get('/logout', logout);

router.post('/signup', signup);
router.post('/login', login);

export default router;

