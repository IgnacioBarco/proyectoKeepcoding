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
    const nombre = req.query.nombre;
    const descripcion = req.query.descripcion;
    const autor = req.query.autor;
    const fecha = req.query.fecha;

    const tag = req.query.tag;
    const chat = req.query.chat;
    
    const venta = req.query.venta;
    const reservado = req.query.reservado
    const vendido = req.query.vendido
    
    const precio = req.query.precio;
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

    if (descripcion) {
      filter.descripcion = new RegExp(req.query.descripcion, "i");
    }

    if (autor) {
      filter.autor = new RegExp(req.query.autor, "i");
    }

    if (fecha) {
      filter.fecha = new RegExp(req.query.fecha, "i");
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
    if (venta) {
      filter.venta = venta;
    }
    if (reservado) {
      filter.reservado = reservado;
    }
    if (vendido) {
      filter.vendido = vendido;
    }
    
       
    /**
     * Filtramos el precio
     * 
     * -x menos de x
     * x- mas de x
     * x-y entre x e y
     * x ese valor 
     */
    if (typeof precio !== "undefined") {
      filter.precio = {};
      let importes = precio.split("-");

      if (precio.startsWith("-")) {
        filter.precio.$lt = importes[1];

      } else if (precio.endsWith("-")) {
        filter.precio.$gt = importes[0];

      } else if (precio.includes("-")) {
        filter.precio.$gt = importes[0];
        filter.precio.$lt = importes[1];

      } else {
        filter.precio = precio;

      }
    }

    const anuncios = await Anuncio.list({
      filter: filter,
      start,
      limit,
      fields,
      sort
    });

    res.json({ success: true, anuncios: anuncios });
  } catch (err) {
    next(err);
  }
});

/**
 * devuelve los anuncios
 * si no lleva params devuelve todos
 * si lleva, los devuelve filtrados
 */
router.get("/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const advert = await Anuncio.adsById(_id);

    //si el no hay anuncio
    if (Object.keys(advert).length === 0) {
      res.json({ success: false, advert: 'no hay anuncio con ese id' });
      return;
    }

    res.json({ success: true, advert: advert });
  } catch (err) {
    next(err);
  }
});

/**
 * devuelve los tags
 */
router.get("/tags", (req, res, next) => {
  try {
    const anuncios = Anuncio.tags();
    // res.json({ success: true, anuncios: anuncios });
    res.json(anuncios);
    res.send("ok");

  } catch (err) {
    next(err);
  }
});


module.exports = router;
