"use strict";

const db = require("./lib/connectMongoose");
const mongoose = require("mongoose");
const Advert = require("./models/Advert");
const User = require("./models/User");
const fs = require("fs");

initDB();

async function initDB() {
  db.once("open", async function() {
    let err = "error al borrar los anuncios antiguos ";
    try {
      //borramos todos los anuncios anteriores
      await Advert.deleteMany({});

      //cargamos los anuncios del archivo en items
      err = "Error al cargar los anuncios desde el fichero ";
      let dump = JSON.parse(fs.readFileSync("./adverts.json", "utf8"));
      let items = [];
      for (let i = 0; i < dump.adverts.length; i++) {
        items.push(new Advert({ ...dump.adverts[i] }));
      }

      //insertamos los anuncios
      err = "Error al insertar los anuncios a la base de datos ";
      await Advert.insertMany(items);
      console.log("Se han cargado " + items.length + " anuncios");

      //borramos todos los usuarios anteriores
      await User.deleteMany({});

      //cargamos los usuarios del archivo en items
      err = "Error al cargar los usuarios desde el fichero ";
      dump = JSON.parse(fs.readFileSync("./users.json", "utf8"));
      items = [];
      for (let i = 0; i < dump.users.length; i++) {
        // encriptamos las passwordes para introducirlas en la base de datos
        dump.users[i].pass = await User.hashPassword(dump.users[i].pass);
        items.push(new User({ ...dump.users[i] }));
      }

      //insertamos los anuncios
      err = "Error al insertar los usuarios a la base de datos ";
      await User.insertMany(items);
      console.log("Se han cargado " + items.length + " usuarios");

      return process.exit(0);
    } catch (error) {
      console.log("Error al inicializar la base de datos! ", err, error);
      return process.exit(1);
    }
  });
}
