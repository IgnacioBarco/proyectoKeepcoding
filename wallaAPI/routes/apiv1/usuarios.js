"use strict";

const express = require("express");
const jwt = require('jsonwebtoken')
const router = express.Router();
const jwtAuth = require('../../lib/jwtAuth')

const Usuario = require("../../models/User");

// POST /authenticate
router.post('/', async (req, res, next) => {
  try {
    const email = req.body.email
    const pass = req.body.pass

    // hacemos un hash de la password
    const hashedPassword = Usuario.hashPassword(pass)

    const user = await Usuario.findOne({ email: email, pass: hashedPassword })

    if (!user) {
      // Respondemos que no son validas las credenciales
      res.json({ ok: false, error: 'invalid credentials' })
      return;
    }

    // el usuario está y coincide la password

    // creamos el token
    jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    }, (err, token) => {
      if (err) {
        return next(err)
      }
      // respondemos con un JWT
      res.json({ ok: true, token: token })
    })
  } catch (err) {
    next(err)
  }
})


/**
 * devuelve los anuncios
 * si no lleva params devuelve todos
 * si lleva, los devuelve filtrados
 */
router.get("/", async (req, res, next) => {
  try {
    const name = req.query.name;
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
    if (name) {
      filter.name = new RegExp(req.query.name, "i");
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

router.get("/:name", async (req, res, next) => {
  try {
    const _name = req.params.name;
    const usuario = await Usuario.userDetails(_name);
    res.json(usuario);


  } catch (err) {
    next(err);
  }
});


/**
 * devuelve los tags
 */
// router.get("/tags", (req, res, next) => {
//   try {
//     const anuncios = Anuncio.tags();
//     // res.json({ success: true, anuncios: anuncios });
//     res.json(anuncios);
//     res.send("ok");

//   } catch (err) {
//     next(err);
//   }
// });

/**
 * crea un nuevo anuncio
 */
// router.post("/nuevo", async (req, res, next) => {
//   try {
//     const data = req.body;
//     const anuncio = new Anuncio(data);
//     const anuncioGuardado = await anuncio.save();

//     res.json({ success: true, result: anuncioGuardado });
//   } catch (err) {
//     next(err);
//   }
// });

/**
 * para modificar un anuncio
 */
// router.put('/modificar/:id', async (req, res, next) => {
//   try {
//     const _id = req.params.id;
//     const data = req.body;
//     const anuncioGuardado = await Anuncio.findOneAndUpdate({_id: _id}, data, { new: true }).exec();
//     // new: true --> hace que retorne la versión del agente guardada en la base de datos

//     res.json({ success: true, result: anuncioGuardado });
//   } catch (err) {
//     next(err);
//   }
// });

/**
 * Para borrar un anuncio
 */
// router.delete('/borrar/:id', async (req, res, next) => {
//   try {
//     const _id = req.params.id;
//     await Anuncio.deleteOne({ _id: _id}).exec();
//     res.json({ success: true });

//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
