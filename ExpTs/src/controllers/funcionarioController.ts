import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createFuncionario = async (req: Request, res: Response) => {
  try {
    const { name, departamentoId } = req.body;
    await prisma.funcionario.create({
      data: { name, departamentoId: parseInt(departamentoId) },
    });
    res.redirect('/funcionarios');
  } catch (error) {
    res.status(500).send('Erro ao criar funcionário');
  }
};

export const listFuncionarios = async (req: Request, res: Response) => {
  try {
    const funcionarios = await prisma.funcionario.findMany({
      include: { departamento: true },
    });
    const departamentos = await prisma.departamento.findMany();
    res.render('funcionarios', { funcionarios, departamentos });
  } catch (error) {
    res.status(500).send('Erro ao listar funcionários');
  }
};
