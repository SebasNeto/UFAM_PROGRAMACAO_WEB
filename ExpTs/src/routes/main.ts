import { Router } from 'express';
import { getHb1, getHb2, getHb3, getHb4 } from '../controllers/main';
import departamentoRoutes from './departamentoRoutes';
import funcionarioRoutes from './funcionarioRoutes';

const router = Router();

router.get('/hb1', getHb1);
router.get('/hb2', getHb2);
router.get('/hb3', getHb3);
router.get('/hb4', getHb4);

router.use('/departamentos', departamentoRoutes);
router.use('/funcionarios', funcionarioRoutes);

export default router;
