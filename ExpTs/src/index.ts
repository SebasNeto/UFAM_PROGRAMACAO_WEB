import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import logger from '../middleware/logger';
import router from "./routes"
import { engine } from 'express-handlebars';
import helpers from './helpers';
import main from './routes/main';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3333;

// formato completo
app.use(logger('completo'));

//app.engine('handlebars', engine());
app.engine('handlebars', engine({helpers}));
app.set('view engine', 'handlebars');
app.set('views', './src/views');

//app.use('/', router);
app.use('/', main);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log(`Express app iniciada na porta ${PORT}.`);
});
