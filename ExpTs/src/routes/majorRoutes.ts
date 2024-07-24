//import { Router } from 'express';
import { Router, Request, Response, NextFunction } from 'express';
import { getAllMajors, createMajor, getMajorById, updateMajor, deleteMajor, viewMajor  } from '../controllers/majorController';
import { createCookie } from '../controllers/cookieController';
import jwt from 'jsonwebtoken';

const router = Router();
const secret = 'your_jwt_secret';

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/auth/login');
    }
    jwt.verify(token, secret, (err: any, user: any) => {
        if (err) {
            return res.redirect('/auth/login');
        }
        req.user = user;
        next();
    });
};

router.get('/', getAllMajors);
router.post('/create', createMajor);
router.get('/:id', viewMajor);
router.get('/:id/edit', getMajorById);
router.post('/:id/edit', updateMajor);
router.post('/:id/delete', deleteMajor);
router.get('/create-cookie', createCookie);
export default router;
