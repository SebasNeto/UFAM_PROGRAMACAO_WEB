"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import { Router } from 'express';
const express_1 = require("express");
const majorController_1 = require("../controllers/majorController");
const cookieController_1 = require("../controllers/cookieController");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
const secret = 'your_jwt_secret';
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/auth/login');
    }
    jsonwebtoken_1.default.verify(token, secret, (err, user) => {
        if (err) {
            return res.redirect('/auth/login');
        }
        req.user = user;
        next();
    });
};
router.get('/', majorController_1.getAllMajors);
router.post('/create', majorController_1.createMajor);
router.get('/:id', majorController_1.viewMajor);
router.get('/:id/edit', majorController_1.getMajorById);
router.post('/:id/edit', majorController_1.updateMajor);
router.post('/:id/delete', majorController_1.deleteMajor);
router.get('/create-cookie', cookieController_1.createCookie);
exports.default = router;
