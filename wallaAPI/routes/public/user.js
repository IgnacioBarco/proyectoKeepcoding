"use strict";

const express = require("express");
const jwt = require('jsonwebtoken')
const router = express.Router();
const Anuncio = require('../../models/Anuncio');

const Usuario = require("../../models/Usuario");

router.get("/:name", async (req, res, next) => {
  try {
    const _name = req.params.name;
    const usuario = await Usuario.userDetails(_name);

    //si el usuario no existe
    if (Object.keys(usuario).length === 0) {
      res.json('no hay usuarios con ese nombre');
      return;
    }

    const anuncios = await Anuncio.adsByUser(_name);

    //si el usuario no tiene anuncos
    if (Object.keys(anuncios).length === 0) {
      res.json('el usuario no tiene anuncios');
      return;
    }

    res.json(anuncios);


  } catch (err) {
    next(err);
  }
});


module.exports = router;
