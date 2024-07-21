import { Request, Response } from 'express';

const technologies = [
  { name: 'Express', type: 'Framework', poweredByNodejs: true },
  { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
  { name: 'React', type: 'Library', poweredByNodejs: true },
  { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
  { name: 'Django', type: 'Framework', poweredByNodejs: false },
  { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
  { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
];

const professores = [
  { nome: 'David Fernandes', sala: '1238' },
  { nome: 'Horácio Fernandes', sala: '1276' },
  { nome: 'Edelno Moura', sala: '1236' },
  { nome: 'Elaine Harada', sala: '1231' },
];

export const getHb1 = (req: Request, res: Response) => {
  res.render('hb1', { message: 'Olá, você está aprendendo Express + Handlebars!', title: 'Express + Handlebars' });
};

export const getHb2 = (req: Request, res: Response) => {
  res.render('hb2', { title: 'Express Framework' });
};

export const getHb3 = (req: Request, res: Response) => {
  res.render('hb3', { professores, title: 'Professores do IComp/UFAM' });
};

export const getHb4 = (req: Request, res: Response) => {
  res.render('hb4', { technologies });
};
