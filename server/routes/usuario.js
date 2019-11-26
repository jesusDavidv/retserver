const express = require('express');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
const _=require('underscore');
const app = express();
const Usuario=require('../models/usuario');

app.get('/usuario', function (req, res) {
  // para que la persona misma ingrese desde donde quire que muestre y hasta q limite
   
    let desde=req.query.desde||0;
    desde=Number(desde); //esto lo tranforma en un numero
    let limite = req.query.limite || 5;
    limite = Number(limite);
    //get o busqueda para llamar algun registro de la base de datos
    Usuario.find({estado:true},'nombre email role estado google img')//filtracion de datos 
    // para que muestre los siguentes datos se hace
          .skip(desde)
    //para limitar la busqueda sea hace
          .limit(limite)
          .exec((err,usuario)=>{    
          
            if(err){
              return res.status(400).json({
               ok:false,
               err
           });
            };
            //para contar registro utilizamos el count

            Usuario.count({estado:true},(err,conteo)=>{
              res.json({
                ok:true,
                usuario,
                cuantos:conteo
              });

            });
            
       

          });

  });
  
   
  app.post('/usuario', function (req, res) {
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
     
  app.put('/usuario/:id', function (req, res) {
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
    app.delete('/usuario/:id', function (req, res) {

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