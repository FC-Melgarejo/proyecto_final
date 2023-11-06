const express = require('express');
const dotenv = require('dotenv');
const { Command } = require('commander');
const http = require('http');
const initSocket = require('./src/util/io');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const MongoStore = require('connect-mongo');

const passport = require('passport');
const initializePassport = require('./src/config/initializePasswordAuth');

const productsRouter = require('./src/routers/productRouter');
const cartRouter = require('./src/routers/cartRouter');
const viewsRouter = require('./src/routers/viewsRouter');
const sessionRouter = require('./src/routers/sessionRouter');
const userRouter = require('./src/routers/userRouter');

const app = express();
const program = new Command();

program.option('--mode <mode>', 'Modo de trabajo', 'dev');
program.parse();

const options = program.opts();

dotenv.config({
  path: `.env.${options.mode}`
});

const configFn = require('./src/config/config');
const config = configFn();

const CONNECTION_STRING = `mongodb+srv://${config.db_user}:${config.db_password}@${config.db_host}/${config.db_name}?retryWrites=true&w=majority`;

console.log(`Conectandose a ${CONNECTION_STRING}`);

// Configuración handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'handlebars');

// Middlewares
app.use(cookieParser('secretCookie'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(flash());

// Session middleware
app.use(session({
  secret: 'secretSession',
  store: MongoStore.create({
    mongoUrl: CONNECTION_STRING,
    ttl: 1800
  }),
  resave: true,
  saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter);
app.use('/api/users', userRouter);

// MongoDB conexión
mongoose.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión a MongoDB establecida');
    // Iniciar servidor HTTP
    const server = http.createServer(app);
    initSocket(new Server(server));
    server.listen(8080, () => {
      console.log('Servidor corriendo en puerto 8080');
    });
  })
  .catch(error => console.error('Error al conectar a MongoDB:', error));




app.get('/', (req, res) => {
    res.json({
        status: 'running'
    });
});



const server = http.createServer(app); // Crear servidor HTTP

const io = initSocket(server); // Inicializar Socket.IO






