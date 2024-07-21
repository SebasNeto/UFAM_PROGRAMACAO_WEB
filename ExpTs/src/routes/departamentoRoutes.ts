import { Router } from 'express';
import { createDepartamento, listDepartamentos } from '../controllers/departamentoController';

const router = Router();

router.get('/', listDepartamentos);
router.post('/create', createDepartamento);

export default router;
