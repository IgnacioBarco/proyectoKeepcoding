"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const Anuncio = require("../../models/Anuncio");

const Usuario = require("../../models/Usuario");

router.get("/:name", async (req, res, next) => {
  try {
    const _name = req.params.name;
    const user = await Usuario.userDetails(_name);

    //si el usuario no existe
    if (Object.keys(user).length === 0) {
      res.json({
        success: true,
        regsNumber: 0,
        result: "No hay usuarios con ese nombre"
      });
      return;
    }

    const adverts = await Anuncio.adsByUser(_name);

    //si el usuario no tiene anuncos
    if (Object.keys(adverts).length === 0) {
      res.json({
        success: true,
        regsNumber: adverts.length,
        result: "El usuario no tiene anuncios actualmente"
      });
      return;
    }

    res.json({
      success: true,
      regsNumber: adverts.length,
      result: adverts
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
