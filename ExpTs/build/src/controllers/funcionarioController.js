"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listFuncionarios = exports.createFuncionario = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createFuncionario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, departamentoId } = req.body;
        yield prisma.funcionario.create({
            data: { name, departamentoId: parseInt(departamentoId) },
        });
        res.redirect('/funcionarios');
    }
    catch (error) {
        res.status(500).send('Erro ao criar funcionário');
    }
});
exports.createFuncionario = createFuncionario;
const listFuncionarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const funcionarios = yield prisma.funcionario.findMany({
            include: { departamento: true },
        });
        const departamentos = yield prisma.departamento.findMany();
        res.render('funcionarios', { funcionarios, departamentos });
    }
    catch (error) {
        res.status(500).send('Erro ao listar funcionários');
    }
});
exports.listFuncionarios = listFuncionarios;
