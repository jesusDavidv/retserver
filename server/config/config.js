const doenv = require("dotenv");
doenv.config();
// este es el Puerto

process.env.PORT=process.env.PORT || 3000;

//==========================================
//           ENTORNO
//===========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==========================================
//           Vencimiento del token
//===========================================
process.env.CADUCIDAD_TOKEN=60 * 60 * 24 * 30;

//==========================================
//           SEED de autentificacion
//===========================================
process.env.SEED=process.env.SEED||'este-es-el-seed-desarrrollo';


//==========================================
//           Base de datos
//===========================================

let urlDB;

if(process.env.NODE_ENV === 'dev'){
   urlDB = 'mongodb://localhost:27017/cafe';
}else{
    urlDB = 'mongodb+srv://jesus:123456Jd@cluster0-uojoq.mongodb.net/cafe';
}


process.env.URLDB=urlDB;

//==========================================
//           Google Client ID
//===========================================

process.env.CLIENT_ID =process.env.CLIENT_ID || '469815432186-jd4g6eq3kack816gmko0kmhfqa6m5qu7.apps.googleusercontent.com';
