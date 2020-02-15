"use strict";

const mongoose = require("mongoose");
let hash = require("hash.js");

// definimos un esquema
const usersSchema = mongoose.Schema({
  name: { type: String, unique: true, required: true, index: true },
  email: { type: String, unique: true, required: true, index: true },
  pass: { type: String, required: true },
  logged: { type: Boolean, required: true },
  favouritesAds: [{ type: String }]
});

usersSchema.statics.list = function({ filter, start, limit, fields, sort }) {
  const query = Usuario.find(filter);
  query.skip(start);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec();
};

usersSchema.statics.usersOnLine = function() {
  const query = Usuario.find({ logado: true });
  return query.exec();
};

usersSchema.statics.userDetails = function(name) {
  const query = Usuario.find({ nombre: name });
  return query.exec();
};

usersSchema.statics.hashPassword = function(text) {
  return hash
    .sha256()
    .update(text)
    .digest("hex");
};

// creamos el modelo de agente
const User = mongoose.model("User", usersSchema);

module.exports = User;
