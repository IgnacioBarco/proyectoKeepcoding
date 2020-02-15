"use strict";

const express = require("express");
const Usuario = require("../../models/Usuario");

const router = express.Router();

// añadimos un nuevo usuario
router.post("/", async (req, res, next) => {
  try {
    let data = req.body;
    data.pass = await Usuario.hashPassword(data.pass);
    const user = new Usuario(data);
    const userSaved = await user.save();

    res.json({
      success: true,
      regsNumber: 1,
      result: "Usuario registrado: " + userSaved
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
