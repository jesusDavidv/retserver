const express = require('express');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const _=require('underscore');
const app = express();
const Usuario=require('../models/usuario');
const {verificaToken,verificaAdmin_Role}=require('../middlewares/autenticacion');

app.get('/usuario',verificaToken,(req, res) => {
  
  return res.json({
    usuario: req.usuario,
    nombre: req.usuario.nombre,
    email: req.usuario.email,
  });

  });
  
   
  app.post('/usuario',[verificaToken,verificaAdmin_Role], function (req, res) {
      let body=req.body;

    let usuario=new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: cryptr.encrypt(body.password),
        role: body.role
    });

    usuario.save((err,usuarioDB)=>{

        if(err){
           return res.status(400).json({
                ok:false,
                err
            });
        }

     // usuarioDB.password=null;

        res.json({
            ok:true,
            usuario:usuarioDB
        });
    });
     
    });
     
  app.put('/usuario/:id',[verificaToken,verificaAdmin_Role], function (req, res) {
      let id=req.params.id;
      let body =_.pick(req.body,['nombre','email','img','role','estado']);
    
    Usuario.findByIdAndUpdate(id, body,{new:true,runValidators:true}, (err,usuarioDB)=>{
      if(err){
        return res.status(400).json({
             ok:false,
             err
         });
     }

      res.json ({
        ok:true,
        usuario:usuarioDB
   
      });
      });
   });
   // Eliminar registro de la base de datos moogon 
    app.delete('/usuario/:id',[verificaToken,verificaAdmin_Role], function (req, res) {

      let id = req.params.id; //para obtener el id
      // Usuario.findByIdAndRemove(id,(err,usuarioBorrado)=>{
      let cambiaEstado={
        estado:false
      }
      Usuario.findByIdAndUpdate(id,cambiaEstado,{new:true},(err,usuarioBorrado)=>{

        if(err){
          return res.status(400).json({
               ok:false,
               err
           });
       };

       if(usuarioBorrado === null){
        return res.status(400).json({
          ok:false,
          err:{
            message:'Usuario no encontrado activo'
          }
      });
       }

       res.json({
         ok:true,
         usuario:usuarioBorrado
       });

      });

    });
   
    module.exports=app;