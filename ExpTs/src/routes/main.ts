import { Router, Request, Response } from 'express';
import { getHb1, getHb2, getHb3, getHb4 } from '../controllers/main';
import { createCookie } from '../controllers/cookieController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

router.get('/hb1', getHb1);
router.get('/hb2', getHb2);
router.get('/hb3', getHb3);
router.get('/hb4', getHb4);

router.get('/create-cookie', createCookie);


router.use(authenticateToken); 

router.get('/', (req: Request, res: Response) => {
    res.redirect('/auth/login');
});

export default router;
