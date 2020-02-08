"use strict";

const express = require("express");
const router = express.Router();
const jwtAuth = require('../../lib/jwtAuth')

const Anuncio = require("../../models/Anuncio");

/**
 * devuelve los anuncios
 * si no lleva params devuelve todos
 * si lleva, los devuelve filtrados
 */
router.get("/:id", jwtAuth(), async (req, res, next) => {
  try {
    const _id = req.params.id;
    const advert = await Anuncio.adsById(_id);

    //si el no hay anuncio
    if (Object.keys(advert).length === 0) {
      res.json({ success: false, advert: 'no hay anuncio con ese id' });
      return;
    }

    res.json({ success: true, advert: advert });
  } catch (err) {
    next(err);
  }
});


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
    await Anuncio.deleteOne({ _id: _id }).exec();
    res.json({ success: true });

  } catch (err) {
    next(err);
  }
});

module.exports = router;
