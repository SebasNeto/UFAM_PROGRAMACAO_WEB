"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/authRoutes.ts
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
router.get('/signup', (req, res) => res.render('signup'));
router.get('/login', (req, res) => res.render('login'));
router.get('/logout', authController_1.logout);
router.post('/signup', authController_1.signup);
router.post('/login', authController_1.login);
exports.default = router;
