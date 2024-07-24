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
exports.deleteMajor = exports.updateMajor = exports.viewMajor = exports.getMajorById = exports.createMajor = exports.getAllMajors = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllMajors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const majors = yield prisma.major.findMany();
    res.render('majors', { majors });
});
exports.getAllMajors = getAllMajors;
const createMajor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, code, description } = req.body;
    yield prisma.major.create({
        data: { name, code, description },
    });
    res.redirect('/majors');
});
exports.createMajor = createMajor;
const getMajorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const major = yield prisma.major.findUnique({ where: { id } });
    res.render('editMajor', { major });
});
exports.getMajorById = getMajorById;
const viewMajor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const major = yield prisma.major.findUnique({ where: { id } });
    res.render('majors', { majors: [major] });
});
exports.viewMajor = viewMajor;
const updateMajor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, code, description } = req.body;
    yield prisma.major.update({
        where: { id },
        data: { name, code, description },
    });
    res.redirect('/majors');
});
exports.updateMajor = updateMajor;
const deleteMajor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.major.delete({ where: { id } });
    res.redirect('/majors');
});
exports.deleteMajor = deleteMajor;
