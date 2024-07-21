import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createDepartamento = async (req: Request, res: Response) => {
  try {
    const { name, sigla } = req.body;
    await prisma.departamento.create({
      data: { name, sigla },
    });
    res.redirect('/departamentos');
  } catch (error) {
    res.status(500).send('Erro ao criar departamento');
  }
};

export const listDepartamentos = async (req: Request, res: Response) => {
  try {
    const departamentos = await prisma.departamento.findMany();
    res.render('departamentos', { departamentos });
  } catch (error) {
    res.status(500).send('Erro ao listar departamentos');
  }
};
