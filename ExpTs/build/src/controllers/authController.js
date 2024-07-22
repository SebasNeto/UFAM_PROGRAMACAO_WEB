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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const secret = 'your_jwt_secret'; // Substitua por uma chave secreta segura
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, majorId } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        const user = yield prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                majorId,
            },
        });
        res.render('signup', { message: 'Conta criada com sucesso!' });
    }
    catch (error) {
        res.render('signup', { message: 'Erro ao criar conta. Tente novamente.' });
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma.user.findUnique({ where: { email } });
    if (!user) {
        return res.status(401).render('login', { message: 'Credenciais inválidas' });
    }
    const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).render('login', { message: 'Credenciais inválidas' });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, secret, { expiresIn: '1h' });
    res.render('login', { message: 'Login realizado com sucesso!' });
});
exports.login = login;
const logout = (req, res) => {
    res.clearCookie('token');
    //res.redirect('/auth/login?message=Logout%20successful');
    res.render('login', { message: 'Logout realizado com sucesso!' });
};
exports.logout = logout;
