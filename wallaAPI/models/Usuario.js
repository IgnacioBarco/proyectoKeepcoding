"use strict";

const mongoose = require("mongoose");

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

// creamos el modelo de agente
const Usuario = mongoose.model("Usuario", usuariosSchema);

module.exports = Usuario;
