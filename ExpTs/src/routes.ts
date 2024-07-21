import { Router, Request, Response } from 'express';
import { loremIpsum } from 'lorem-ipsum';

const router = Router();

const technologies = [
    { name: 'Express', type: 'Framework', poweredByNodejs: true },
    { name: 'Laravel', type: 'Framework', poweredByNodejs: false },
    { name: 'React', type: 'Library', poweredByNodejs: true },
    { name: 'Handlebars', type: 'Engine View', poweredByNodejs: true },
    { name: 'Django', type: 'Framework', poweredByNodejs: false },
    { name: 'Docker', type: 'Virtualization', poweredByNodejs: false },
    { name: 'Sequelize', type: 'ORM tool', poweredByNodejs: true },
  ];

router.get('/lorem/:num', (req: Request, res: Response) => {
  const numParagraphs = parseInt(req.params.num, 10);
  
  if (isNaN(numParagraphs) || numParagraphs <= 0) {
    return res.status(400).send('Invalid number of paragraphs');
  }

  const paragraphs = loremIpsum({
    count: numParagraphs,
    units: 'paragraphs',
  });

  res.send(paragraphs);
});

router.get('/hb1', (req: Request, res: Response) => {
    res.render('hb1', { message: 'Olá, você está aprendendo Express + Handlebars!', title: 'Express + Handlebars' });
});
  
router.get('/hb2', (req: Request, res: Response) => {
    res.render('hb2', { title: 'Express Framework' });
});
  
router.get('/hb3', (req: Request, res: Response) => {
    const professores = [
      { nome: 'David Fernandes', sala: '1238' },
      { nome: 'Horácio Fernandes', sala: '1276' },
      { nome: 'Edelno Moura', sala: '1236' },
      { nome: 'Elaine Harada', sala: '1231' },
    ];
    res.render('hb3', { professores, title: 'Professores do IComp/UFAM' });
});

router.get('/hb4', (req: Request, res: Response) => {
    res.render('hb4', { technologies });
});

export default router;
