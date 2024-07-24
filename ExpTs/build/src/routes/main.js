"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = require("../controllers/main");
const cookieController_1 = require("../controllers/cookieController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.get('/hb1', main_1.getHb1);
router.get('/hb2', main_1.getHb2);
router.get('/hb3', main_1.getHb3);
router.get('/hb4', main_1.getHb4);
router.get('/create-cookie', cookieController_1.createCookie);
router.use(authMiddleware_1.authenticateToken);
router.get('/', (req, res) => {
    res.redirect('/auth/login');
});
exports.default = router;
