// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secret = 'your_jwt_secret'; // Certifique-se de usar a mesma chave secreta

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        res.locals.isAuthenticated = false;
        return next();
    }

    jwt.verify(token, secret, (err: any, user: any) => {
        if (err) {
            res.locals.isAuthenticated = false;
            return next();
        }
        res.locals.isAuthenticated = true;
        req.user = user;
        next();
    });
};
