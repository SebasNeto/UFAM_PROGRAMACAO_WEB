"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = 'your_jwt_secret'; // Certifique-se de usar a mesma chave secreta
const authenticateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        res.locals.isAuthenticated = false;
        return next();
    }
    jsonwebtoken_1.default.verify(token, secret, (err, user) => {
        if (err) {
            res.locals.isAuthenticated = false;
            return next();
        }
        res.locals.isAuthenticated = true;
        req.user = user;
        next();
    });
};
exports.authenticateToken = authenticateToken;
