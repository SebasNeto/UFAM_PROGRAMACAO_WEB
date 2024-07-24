import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import logger from '../middleware/logger';
import router from "./routes"
import { engine } from 'express-handlebars';
import helpers from './helpers';
import main from './routes/main';
import majorRoutes from './routes/majorRoutes';
import cookieParser from 'cookie-parser'; 
import authRoutes from './routes/authRoutes';

import path from 'path';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

app.use(cookieParser());

// formato completo
app.use(logger('completo'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
//app.engine('handlebars', engine());
app.engine('handlebars', engine({helpers}));
app.engine('handlebars', engine({ defaultLayout: 'main', layoutsDir: './src/views/layouts' }));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

app.use('/', router);
app.use('/', main);
app.use('/majors', majorRoutes);
app.use('/auth', authRoutes);

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello world!');
// });

app.get('/', (req: Request, res: Response) => {
  res.redirect('/auth/login');
});

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
