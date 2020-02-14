"use strict";

const express = require("express");
const jwt = require('jsonwebtoken')
const router = express.Router();
const jwtAuth = require('../../lib/jwtAuth')

const Usuario = require("../../models/Usuario");

/**
 * devuelve los usuarios
 * si no lleva params devuelve todos
 * si lleva, los devuelve filtrados
 */
router.get("/", jwtAuth(), async (req, res, next) => {
  try {
    const nombre = req.query.nombre;
    const email = req.query.email;
    const pass = req.query.pass;

    const anunciosFavoritos = req.query.anunciosFavoritos;

    const logado = req.query.logado;

    const start = parseInt(req.query.start);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;


    const filter = {};

    /**
     * filtro de exp regulares
     */
    if (nombre) {
      filter.nombre = new RegExp(req.query.nombre, "i");
    }

    if (email) {
      filter.email = new RegExp(req.query.email, "i");
    }

    if (pass) {
      filter.pass = new pass(req.query.autor, "i");
    }

    /**
     * filtro de arrays
     */
    if (typeof anunciosFavoritos !== "undefined") {
      filter.anunciosFavoritos = anunciosFavoritos;
    }

    /**
     * filtro de booleanos
     */
    if (logado) {
      filter.logado = logado;
    }

    const usuarios = await Usuario.list({
      filter: filter,
      start,
      limit,
      fields,
      sort
    });

    res.json({ success: true, usuarios: usuarios });

  } catch (err) {
    next(err);
  }
});

router.get("/:name", jwtAuth(), async (req, res, next) => {
  try {
    const _name = req.params.name;
    const usuario = await Usuario.userDetails(_name);
    res.json(usuario);


  } catch (err) {
    next(err);
  }
});

/**
 * devuelve los ususarios online
 */
router.get("/onLine", jwtAuth(), async (req, res, next) => {
  try {
    const usuarios = await Usuario.usersOnLine();
    // res.json({ success: true, anuncios: anuncios });
    res.json(usuarios);


  } catch (err) {
    next(err);
  }
});


module.exports = router;
