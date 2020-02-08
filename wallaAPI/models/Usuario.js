"use strict";

const mongoose = require("mongoose");
let hash = require('hash.js')

// definimos un esquema
const usuariosSchema = mongoose.Schema(
  {
    nombre: String,
    email: String,
    pass: String,
    logado: Boolean,
    anunciosFavoritos: [String]
  }
);

usuariosSchema.statics.list = function({ filter, start, limit, fields, sort }) {
  const query = Usuario.find(filter);
  query.skip(start);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec();
};

usuariosSchema.statics.usersOnLine = function() {
  const query = Usuario.find({logado:true});
  return query.exec();

};

usuariosSchema.statics.userDetails = function(name) {
  const query = Usuario.find({nombre:name});
  return query.exec();

};

usuariosSchema.statics.hashPassword = function (text) {
  return hash.sha256().update(text).digest('hex')
}


// creamos el modelo de agente
const Usuario = mongoose.model("Usuario", usuariosSchema);

module.exports = Usuario;
