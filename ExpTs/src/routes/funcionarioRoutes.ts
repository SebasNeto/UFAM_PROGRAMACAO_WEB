import { Router } from 'express';
import { createFuncionario, listFuncionarios } from '../controllers/funcionarioController';

const router = Router();

router.get('/', listFuncionarios);
router.post('/create', createFuncionario);

export default router;
