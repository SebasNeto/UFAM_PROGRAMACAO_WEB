"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const funcionarioController_1 = require("../controllers/funcionarioController");
const router = (0, express_1.Router)();
router.get('/', funcionarioController_1.listFuncionarios);
router.post('/create', funcionarioController_1.createFuncionario);
exports.default = router;
