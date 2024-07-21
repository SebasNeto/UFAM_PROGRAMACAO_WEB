import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const logDirectory = process.env.LOG_DIR || './logs';

if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

const logger = (format: 'simples' | 'completo') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const logFormat = format === 'completo'
      ? `${new Date().toISOString()}, ${req.url}, ${req.method}, ${req.httpVersion}, ${req.get('User-Agent')}\n`
      : `${new Date().toISOString()}, ${req.url}, ${req.method}\n`;

    const logFilePath = path.join(logDirectory, 'access.log');
    fs.appendFile(logFilePath, logFormat, (err) => {
      if (err) {
        console.error('Falha ao gravar no arquivo log:', err);
      }
    });

    next();
  };
};

export default logger;

