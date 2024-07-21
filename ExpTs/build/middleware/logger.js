"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const logDirectory = process.env.LOG_DIR || './logs';
if (!fs_1.default.existsSync(logDirectory)) {
    fs_1.default.mkdirSync(logDirectory);
}
const logger = (format) => {
    return (req, res, next) => {
        const logFormat = format === 'completo'
            ? `${new Date().toISOString()}, ${req.url}, ${req.method}, ${req.httpVersion}, ${req.get('User-Agent')}\n`
            : `${new Date().toISOString()}, ${req.url}, ${req.method}\n`;
        const logFilePath = path_1.default.join(logDirectory, 'access.log');
        fs_1.default.appendFile(logFilePath, logFormat, (err) => {
            if (err) {
                console.error('Falha ao gravar no arquivo log:', err);
            }
        });
        next();
    };
};
exports.default = logger;
