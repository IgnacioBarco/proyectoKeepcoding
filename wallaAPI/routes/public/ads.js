"use strict";

const express = require("express");
const router = express.Router();

const Anuncio = require("../../models/Anuncio");

/**
 * devuelve los anuncios
 * si no lleva params devuelve todos
 * si lleva, los devuelve filtrados
 */
router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
    const description = req.query.description;
    const author = req.query.author;
    const date = req.query.date;

    const tag = req.query.tag;
    const chat = req.query.chat;

    const sell = req.query.sell;
    const reserved = req.query.reserved;
    const sold = req.query.sold;

    const price = req.query.price;
    const start = parseInt(req.query.start);
    const limit = parseInt(req.query.limit);
    const fields = req.query.fields;
    const sort = req.query.sort;

    const filter = {};

    /**
     * filtro de exp regulares
     */
    if (name) {
      filter.name = new RegExp(req.query.name, "i");
    }

    if (description) {
      filter.description = new RegExp(req.query.description, "i");
    }

    if (author) {
      filter.author = new RegExp(req.query.author, "i");
    }

    if (date) {
      filter.date = new RegExp(req.query.date, "i");
    }

    /**
     * filtro de arrays
     */
    if (typeof tag !== "undefined") {
      filter.tags = tag;
    }

    if (typeof chat !== "undefined") {
      filter.chat = chat;
    }

    /**
     * filtro de booleanos
     */
    if (sell) {
      filter.sell = sell;
    }
    if (reserved) {
      filter.reserved = reserved;
    }
    if (sold) {
      filter.sold = sold;
    }

    /**
     * Filtramos el price
     *
     * -x menos de x
     * x- mas de x
     * x-y entre x e y
     * x ese valor
     */
    if (typeof price !== "undefined") {
      filter.price = {};
      let importes = price.split("-");

      if (price.startsWith("-")) {
        filter.price.$lt = importes[1];
      } else if (price.endsWith("-")) {
        filter.price.$gt = importes[0];
      } else if (price.includes("-")) {
        filter.price.$gt = importes[0];
        filter.price.$lt = importes[1];
      } else {
        filter.price = price;
      }
    }

    const adverts = await Anuncio.list({
      filter: filter,
      start,
      limit,
      fields,
      sort
    });

    res.json({
      success: true,
      regsNumber: adverts.length,
      result: adverts
    });
  } catch (err) {
    next(err);
  }
});

/**
 * devuelve el anuncio con ese id
 *
 */
router.get("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const advert = await Anuncio.adsById(_id);

    //si no hay anuncio
    if (Object.keys(advert).length === 0) {
      res.json({
        success: true,
        regsNumber: 0,
        result: "No hay ningun anuncio con ese id"
      });
      return;
    }

    res.json({
      success: true,
      regsNumber: 1,
      result: advert
    });
  } catch (err) {
    next(err);
  }
});

/**
 * devuelve los tags
 */
router.get("/tags", (req, res, next) => {
  try {
    const tags = Anuncio.tags();
    res.json(tags);
    // res.send("ok");
  } catch (err) {
    next(err);
  }
});

module.exports = router;
