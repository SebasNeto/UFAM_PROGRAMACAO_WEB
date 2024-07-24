"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCookie = void 0;
const createCookie = (req, res) => {
    const cookieName = 'nomeCookie';
    const cookieValue = 'valorCookie';
    const cookieOptions = { maxAge: 900000, httpOnly: true };
    if (!req.cookies[cookieName]) {
        res.cookie(cookieName, cookieValue, cookieOptions);
        res.send('Você JÁ passou por aqui');
    }
    else {
        res.send('Bem-vindo de volta!');
    }
};
exports.createCookie = createCookie;
