import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const secret = 'your_jwt_secret'; 

export const signup = async (req: Request, res: Response) => {
    const { name, email, password, majorId } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          majorId,
        },
      });
      res.render('signup', { message: 'Conta criada com sucesso!' });
    } catch (error) {
      console.error(error);
      res.render('signup', { message: 'Erro ao criar conta. Tente novamente.' });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
  
    if (!user) {
      return res.status(401).render('login', { message: 'Credenciais inválidas' });
    }
  
    const isPasswordValid = await bcrypt.compare(password, user.password);
  
    if (!isPasswordValid) {
      return res.status(401).render('login', { message: 'Credenciais inválidas' });
    }
  
    const token = jwt.sign({ userId: user.id }, secret, { expiresIn: '1h' });
    
    //res.render('login', { message: 'Login realizado com sucesso!' });
    res.cookie('token', token, { httpOnly: true});
    res.redirect('/majors');
};

export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    //res.redirect('/auth/login?message=Logout%20successful');
    res.render('login', { message: 'Logout realizado com sucesso!' });
};
  
