const doenv = require("dotenv");
doenv.config();
// este es el Puerto

process.env.PORT=process.env.PORT || 3000;

//==========================================
//           ENTORNO
//===========================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

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