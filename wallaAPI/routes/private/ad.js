"use strict";

const express = require("express");
const router = express.Router();
const jwtAuth = require('../../lib/jwtAuth')

const Anuncio = require("../../models/Anuncio");




/**
 * crea un nuevo anuncio
 */
router.post("/new", jwtAuth(), async (req, res, next) => {
  try {
    const data = req.body;
    const anuncio = new Anuncio(data);
    const anuncioGuardado = await anuncio.save();

    res.json({ success: true, result: anuncioGuardado });
  } catch (err) {
    next(err);
  }
});

/**
 * para modificar un anuncio
 */
router.put('/:id/modify', jwtAuth(), async (req, res, next) => {
  try {
    const _id = req.params.id;
    const data = req.body;
    const anuncioGuardado = await Anuncio.findOneAndUpdate({ _id: _id }, data, { new: true }).exec();
    // new: true --> hace que retorne la versión del agente guardada en la base de datos

    res.json({ success: true, result: anuncioGuardado });
  } catch (err) {
    next(err);
  }
});

/**
 * Para borrar un anuncio
 */
router.delete('/:id/delete', jwtAuth(), async (req, res, next) => {
  try {
    const _id = req.params.id;
    await Anuncio.deleteById(id).exec();
    res.json({ success: true });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
