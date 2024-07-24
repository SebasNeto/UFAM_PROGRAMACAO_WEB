"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const logger_1 = __importDefault(require("../middleware/logger"));
const routes_1 = __importDefault(require("./routes"));
const express_handlebars_1 = require("express-handlebars");
const helpers_1 = __importDefault(require("./helpers"));
const main_1 = __importDefault(require("./routes/main"));
const majorRoutes_1 = __importDefault(require("./routes/majorRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3333;
app.use((0, cookie_parser_1.default)());
// formato completo
app.use((0, logger_1.default)('completo'));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
//app.engine('handlebars', engine());
app.engine('handlebars', (0, express_handlebars_1.engine)({ helpers: helpers_1.default }));
app.engine('handlebars', (0, express_handlebars_1.engine)({ defaultLayout: 'main', layoutsDir: './src/views/layouts' }));
app.set('view engine', 'handlebars');
app.set('views', './src/views');
app.use('/', routes_1.default);
app.use('/', main_1.default);
app.use('/majors', majorRoutes_1.default);
app.use('/auth', authRoutes_1.default);
// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello world!');
// });
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});
// router.get('/', (req, res) => {
//   res.render('main');
// });
app.listen(PORT, () => {
    console.log(`Express app iniciada na porta ${PORT}.`);
});
