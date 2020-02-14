"use strict";

const express = require("express");
const jwt = require('jsonwebtoken')
const router = express.Router();
const jwtAuth = require('../../lib/jwtAuth')

const Usuario = require("../../models/Usuario");


/**
 * crea un nuevo anuncio
 */
// router.post("/new", jwtAuth(), async (req, res, next) => {
//   try {
//     const data = req.body;
//     const anuncio = new Anuncio(data);
//     const anuncioGuardado = await anuncio.save();

//     res.json({ success: true, result: anuncioGuardado });
//   } catch (err) {
//     next(err);
//   }
// });

/**
 * para modificar un anuncio
 */
// router.put('/modificar/:id', jwtAuth(), async (req, res, next) => {
//   try {
//     const _id = req.params.id;
//     const data = req.body;
//     const anuncioGuardado = await Anuncio.findOneAndUpdate({_id: _id}, data, { new: true }).exec();
//     // new: true --> hace que retorne la versión del agente guardada en la base de datos

//     res.json({ success: true, result: anuncioGuardado });
//   } catch (err) {
//     next(err);
//   }
// });

// eliminamos el usuario
router.post('/:name/delete', jwtAuth(), async (req, res, next) => {
  try {

    //comprobamos que es el propio usuario

    //borramos los anuncios que tiene

    //borramos el usuario

    //mensaje de usuario borrado
    
  } catch (err) {
    next(err)
  }
})
/**
 * Para borrar un anuncio
 */
// router.delete('/borrar/:id', jwtAuth(), async (req, res, next) => {
//   try {
//     const _id = req.params.id;
//     await Anuncio.deleteOne({ _id: _id}).exec();
//     res.json({ success: true });

//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
