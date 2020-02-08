"use strict";

const express = require("express");
const router = express.Router();
const jwtAuth = require('../../lib/jwtAuth')

const Usuario = require("../../models/Usuario");

// eliminamos el usuario
router.post('/:name', jwtAuth(), async (req, res, next) => {
  try {

    //comprobamos que es el propio usuario

    //borramos los anuncios que tiene

    //borramos el usuario

    //mensaje de usuario borrado
    
  } catch (err) {
    next(err)
  }
})


module.exports = router;