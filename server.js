const express = require('express');
const dotenv =require('dotenv')
const {Command}= require('commander');
const productsRouter = require('./src/routers/productRouter');
const cartRouter = require('./src/routers/cartRouter')
const viewsRouter = require('./src/routers/viewsRouter');
const sessionRouter = require('./src/routers/sessionRouter');
const passport = require('passport');
const initializePassport = require('./src/config/initializePasswordAuth');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars')
const configFn = require('./src/config/config');
const path = require('path');

const app = express();
const program = new Command()

program 
  .option('--mode <mode>', 'Modo de trabajo', 'dev')

program.parse()

const options = program.opts()


 
dotenv.config({
  path: `.env.${options.mode}`
});

console.log({options})
console.log(process.env)

const config = configFn();

const CONNECTION_STRING = `mongodb+srv://${config.db_user}:${config.db_password}@${config.db_host}/${config.db_name}?retryWrites=true&w=majority`;

console.log(`Conectandose a ${CONNECTION_STRING}`);

// Configuración handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(cookieParser('secretCookie'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(flash());
app.use(session({
  secret: 'secretSession',
  store: MongoStore.create({
    mongoUrl: CONNECTION_STRING,
    ttl: 15
  }),
  resave: true,
  saveUninitialized: true
}));

initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)
app.use('/api/session', sessionRouter)

app.get('/', (req, res) => {
    res.json({
        status: 'running'
    });
});

const PORT = 8080;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));



