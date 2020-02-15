"use strict";

const express = require("express");
const router = express.Router();
const jwtAuth = require("../../lib/jwtAuth");

const Anuncio = require("../../models/Advert");

/**
 * crea un nuevo anuncio
 */
router.post("/new", jwtAuth(), async (req, res, next) => {
  try {
    const data = req.body;
    const advert = new Anuncio(data);
    const adSave = await advert.save();

    res.json({
      success: true,
      regsNumber: 1,
      result: "Anuncio guardado: " + adSave
    });
  } catch (err) {
    next(err);
  }
});

/**
 * para modificar un anuncio
 */
router.put("/:id/modify", jwtAuth(), async (req, res, next) => {
  try {
    const _id = req.params.id;
    const data = req.body;
    const adSave = await Anuncio.findOneAndUpdate({ _id: _id }, data, {
      new: true
    }).exec();

    res.json({
      success: true,
      regsNumber: 1,
      result: "Anuncio modificado: " + adSave
    });
  } catch (err) {
    next(err);
  }
});

/**
 * Para borrar un anuncio
 */
router.delete("/:id/delete", jwtAuth(), async (req, res, next) => {
  try {
    const _id = req.params.id;
    await Anuncio.deleteById(_id).exec();
    res.json({
      success: true,
      regsNumber: 1,
      result: "Anuncio eliminado"
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
