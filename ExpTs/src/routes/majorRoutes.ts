import { Router } from 'express';
import { getAllMajors, createMajor, getMajorById, updateMajor, deleteMajor, viewMajor  } from '../controllers/majorController';
import { createCookie } from '../controllers/cookieController';

const router = Router();

router.get('/', getAllMajors);
router.post('/create', createMajor);
router.get('/:id', viewMajor);
router.get('/:id/edit', getMajorById);
router.post('/:id/edit', updateMajor);
router.post('/:id/delete', deleteMajor);
router.get('/create-cookie', createCookie);
export default router;
