"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const departamentoController_1 = require("../controllers/departamentoController");
const router = (0, express_1.Router)();
router.get('/', departamentoController_1.listDepartamentos);
router.post('/create', departamentoController_1.createDepartamento);
exports.default = router;
