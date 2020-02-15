"use strict";

const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const jwtAuth = require("../../lib/jwtAuth");

const Usuario = require("../../models/User");

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

    const users = await Usuario.list({
      filter: filter,
      start,
      limit,
      fields,
      sort
    });

    //si no hay ningun usuario con esos filtros
    if (Object.keys(users).length === 0) {
      res.json({
        success: true,
        regsNumber: 0,
        result: "No hay ningun usuario con esos filtros de busqueda"
      });
      return;
    }

    res.json({
      success: true,
      regsNumber: users.length,
      result: users
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:name", jwtAuth(), async (req, res, next) => {
  try {
    const _name = req.params.name;
    const user = await Usuario.userDetails(_name);

    //si no hay ningun usuario con ese nombre
    if (Object.keys(user).length === 0) {
      res.json({
        success: true,
        regsNumber: 0,
        result: "No hay ningun usuario con ese nombre"
      });
      return;
    }

    res.json({
      success: true,
      regsNumber: 1,
      result: user
    });
  } catch (err) {
    next(err);
  }
});

/**
 * devuelve los ususarios online
 */
router.get("/onLine", jwtAuth(), async (req, res, next) => {
  try {
    const users = await Usuario.usersOnLine();
    res.json({
      success: true,
      regsNumber: users.length,
      result: users
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
