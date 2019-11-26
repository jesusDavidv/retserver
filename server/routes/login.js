const express = require('express');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const app = express();
const Usuario=require('../models/usuario');


app.post('/login',(req,res) =>{
    let body = req.body;
    Usuario.findOne({email:body.email},(err,usuarioDB)=>{

        if(err){
            return res.status(400).json({
                 ok:false,
                 err
             });
         };
         if(!usuarioDB){
            return res.status(500).json({
                ok:false,
                err:{
                    message:'(Usuario) o contraseña incorrecto'
                }
            });
         }
        let passwordBD = cryptr.decrypt(usuarioDB.password)
       if(body.password !== passwordBD){
        return res.status(400).json({
            ok:false,
            err:{
                message:'Usuario o (contraseña) incorrecto'
            }
        });
       }
       res.json({
           ok:true,
            usuario:usuarioDB,
            token: '123' 
       });
    });

});






module.exports=app;