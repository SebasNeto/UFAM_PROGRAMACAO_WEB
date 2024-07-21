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
exports.listDepartamentos = exports.createDepartamento = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createDepartamento = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, sigla } = req.body;
        yield prisma.departamento.create({
            data: { name, sigla },
        });
        res.redirect('/departamentos');
    }
    catch (error) {
        res.status(500).send('Erro ao criar departamento');
    }
});
exports.createDepartamento = createDepartamento;
const listDepartamentos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const departamentos = yield prisma.departamento.findMany();
        res.render('departamentos', { departamentos });
    }
    catch (error) {
        res.status(500).send('Erro ao listar departamentos');
    }
});
exports.listDepartamentos = listDepartamentos;
