const express = require('express');
const dotenv = require('dotenv');
const productsRouter = require('./routers/productRouter');
const viewsRouter = require('./routers/viewsRouter');
const passport = require('passport');
const initializePassport = require('../src/config/initializePasswordAuth');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const sessionRouter = require('./routers/sessionRouter');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const handlebars = require("express-handlebars");
const configFn = require('./config/config');



const app = express();

app.use(cookieParser('secretCookie'));

// Configuración handlebars
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
dotenv.config();


const config = configFn()

const CONNECTION_STRING = `mongodb+srv://${config.db_user}:${config.db_password}@${config.db_host}/${config.db_name}?retryWrites=true&w=majority`

console.log(`Conectandose a ${CONNECTION_STRING}`)



app.use(express.json());
app.use(flash());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(session({
  secret: 'secretSession', 
  store: MongoStore.create({
    mongoUrl: CONNECTION_STRING,
    ttl: 15
  }),
  resave: true,
  saveUninitialized: true
}))





initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/products', productsRouter)
app.use('/', viewsRouter)
app.use('/api/sessions', sessionRouter);



app.get('/', (req, res) => {
    res.json({
        status: 'running',
        
    })
})



const PORT = 8080;
app.listen(PORT, () => console.log(`servidor corriendo en puerto ${PORT}`));

