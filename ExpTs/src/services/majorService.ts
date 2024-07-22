import { PrismaClient } from '@prisma/client';
import { CreateMajorDto } from '../types/major';

const prisma = new PrismaClient();

export const getAllMajors = async () => {
  return prisma.major.findMany();
};

export const createMajor = async (data: CreateMajorDto) => {
  return prisma.major.create({ data });
};
