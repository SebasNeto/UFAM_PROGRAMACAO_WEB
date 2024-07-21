"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const main_1 = require("../controllers/main");
const departamentoRoutes_1 = __importDefault(require("./departamentoRoutes"));
const funcionarioRoutes_1 = __importDefault(require("./funcionarioRoutes"));
const router = (0, express_1.Router)();
router.get('/hb1', main_1.getHb1);
router.get('/hb2', main_1.getHb2);
router.get('/hb3', main_1.getHb3);
router.get('/hb4', main_1.getHb4);
router.use('/departamentos', departamentoRoutes_1.default);
router.use('/funcionarios', funcionarioRoutes_1.default);
exports.default = router;
