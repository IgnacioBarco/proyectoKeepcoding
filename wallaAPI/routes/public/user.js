"use strict";

const express = require("express");
const router = express.Router();
const Advert = require("../../models/Advert");

const User = require("../../models/User");

router.get("/:name", async (req, res, next) => {
  try {
    const _name = req.params.name;
    const user = await User.userDetails(_name);

    //si el User no existe
    if (Object.keys(user).length === 0) {
      res.json({
        success: true,
        regsNumber: 0,
        result: "No hay usuarios con ese nombre"
      });
      return;
    }

    const adverts = await Advert.adsByUser(_name);

    //si el User no tiene anuncos
    if (Object.keys(adverts).length === 0) {
      res.json({
        success: true,
        regsNumber: adverts.length,
        result: "El User no tiene anuncios actualmente"
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
