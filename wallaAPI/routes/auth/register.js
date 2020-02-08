"use strict";

const express = require("express");
const jwt = require('jsonwebtoken')
const router = express.Router();
const jwtAuth = require('../../lib/jwtAuth')

const Usuario = require("../../models/Usuario");

// añadimos un nuevo usuario
router.post('/', async (req, res, next) => {
  try {

    let data = req.body;
    data.pass = await Usuario.hashPassword(data.pass);
    const user = new Usuario(data);
    const usuarioGuardado = await user.save();

    res.json({ success: true, result: usuarioGuardado });
  } catch (err) {
    next(err)
  }
})


module.exports = router;
