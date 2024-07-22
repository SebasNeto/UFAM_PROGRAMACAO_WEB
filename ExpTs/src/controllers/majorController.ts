import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllMajors = async (req: Request, res: Response) => {
  const majors = await prisma.major.findMany();
  res.render('majors', { majors });
};

export const createMajor = async (req: Request, res: Response) => {
  const { name, code, description } = req.body;
  await prisma.major.create({
    data: { name, code, description },
  });
  res.redirect('/majors');
};

export const getMajorById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const major = await prisma.major.findUnique({ where: { id } });
  res.render('editMajor', { major });
};

export const viewMajor = async (req: Request, res: Response) => {
    const { id } = req.params;
    const major = await prisma.major.findUnique({ where: { id } });
    res.render('majors', { majors: [major] });
};
  
export const updateMajor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, code, description } = req.body;
  await prisma.major.update({
    where: { id },
    data: { name, code, description },
  });
  res.redirect('/majors');
};

export const deleteMajor = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.major.delete({ where: { id } });
  res.redirect('/majors');
};
