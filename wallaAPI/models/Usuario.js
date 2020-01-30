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
  //, { collection: 'agentes'} // para saltarse la pluralización
);

usuariosSchema.statics.list = function({ filter, start, limit, fields, sort }) {
  const query = Usuario.find(filter);
  query.skip(start);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec();
};

usuariosSchema.statics.tags = function() {
  return ["work", "lifestyle", "motor", "mobile"];
};

// creamos el modelo de agente
const Usuario = mongoose.model("Usuario", usuariosSchema);

module.exports = Usuario;
