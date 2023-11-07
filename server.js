const express = require('express');
const dotenv = require('dotenv');
const { Command } = require('commander');
const http = require('http');
const initSocket = require('./src/util/io');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const handlebars = require('express-handlebars');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const DB = require('./src/db/singleton'); // Importar Singleton
const passport = require('passport');
const initializePassport = require('./src/config/initializePasswordAuth');
const productsRouter = require('./src/routers/productRouter');
const cartRouter = require('./src/routers/cartRouter');
const viewsRouter = require('./src/routers/viewsRouter');
const sessionRouter = require('./src/routers/sessionRouter');
const userRouter = require('./src/routers/userRouter');
const config = require('./src/config/config');
const cors = require('cors')

const app = express();

app.use(cors())

const program = new Command();
program
  .option('--mode <mode>', 'Modo de trabajo', 'dev')

program.parse()

const options = program.opts()

dotenv.config({
  path: `.env.${options.mode}`
})

const settings = config()
console.log({settings});

const dbConnection = DB.getConnection(settings)

DB.getConnection(settings)



// Configuración handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'handlebars');



// Iniciar servidor HTTP
const server = http.createServer(app);
const io = initSocket(new Server(server));

server.listen(8080, () => {
  console.log('Servidor corriendo en puerto 8080');
});

app.get('/', (req, res) => {
  res.json({
    status: 'running'
  });
});








