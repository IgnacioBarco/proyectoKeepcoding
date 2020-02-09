"use strict";

const mongoose = require("mongoose");

// definimos un esquema
const anunciosSchema = mongoose.Schema(
  {
    nombre: { type: String, unique: true, required: true, index: true },
    foto: { type: String, unique: true, required: true },
    descripcion: { type: String, unique: true, required: true },
    venta: { type: Boolean, required: true },
    precio: { type: Number, min: 1, required: true, index: true },
    autor: { type: String, required: true },
    fecha: { type: String, required: true },
    // createdDate: { type: Date, default: Date.now },
    tags: [{ type: String, index: true }],
    reservado: { type: Boolean, required: true },
    vendido: { type: Boolean, required: true },
    chat: [{ type: String }]
  }
  //, { collection: 'agentes'} // para saltarse la pluralización
);

anunciosSchema.statics.list = function ({ filter, start, limit, fields, sort }) {
  const query = Anuncio.find(filter);
  query.skip(start);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec();
};

anunciosSchema.statics.tags = function () {
  return ["work", "lifestyle", "motor", "mobile"];
};

anunciosSchema.statics.deleteById = function (id) {
  const query = Anuncio.deleteOne({ _id: _id });
  return query.exec();

};

anunciosSchema.statics.adsById = function (id) {
  const query = Anuncio.find({ _id: id });
  return query.exec();

};

anunciosSchema.statics.adsByUser = function (autor) {
  const query = Anuncio.find({ autor: autor });
  return query.exec();

};

// creamos el modelo de agente
const Anuncio = mongoose.model("Anuncio", anunciosSchema);

module.exports = Anuncio;
