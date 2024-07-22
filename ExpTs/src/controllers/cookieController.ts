import { Request, Response } from 'express';

export const createCookie = (req: Request, res: Response) => {
  const cookieName = 'nomeCookie';
  const cookieValue = 'valorCookie';
  const cookieOptions = { maxAge: 900000, httpOnly: true };

  if (!req.cookies[cookieName]) {
    res.cookie(cookieName, cookieValue, cookieOptions);
    res.send('Você JÁ passou por aqui');
  } else {
    res.send('Bem-vindo de volta!');
  }
};
