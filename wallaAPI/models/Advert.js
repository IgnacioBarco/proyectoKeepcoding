"use strict";

const mongoose = require("mongoose");

// definimos un esquema
const advertsSchema = mongoose.Schema({
  name: { type: String, required: true, index: true },
  photo: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  sell: { type: Boolean, required: true },
  price: { type: Number, min: 1, required: true, index: true },
  author: { type: String, required: true },
  date: { type: String, required: true },
  // createdDate: { type: Date, default: Date.now },
  tags: [{ type: String, index: true }],
  reserved: { type: Boolean, required: true },
  sold: { type: Boolean, required: true },
  chat: [{ type: String }]
});

advertsSchema.statics.list = function({ filter, start, limit, fields, sort }) {
  const query = Advert.find(filter);
  query.skip(start);
  query.limit(limit);
  query.select(fields);
  query.sort(sort);
  return query.exec();
};

advertsSchema.statics.tags = function() {
  return ["work", "lifestyle", "motor", "mobile"];
};

advertsSchema.statics.deleteById = function(id) {
  const query = Advert.deleteOne({ _id: _id });
  return query.exec();
};

advertsSchema.statics.adsById = function(id) {
  const query = Advert.find({ _id: id });
  return query.exec();
};

advertsSchema.statics.adsByUser = function(author) {
  const query = Advert.find({ author: author });
  return query.exec();
};

// creamos el modelo de agente
const Advert = mongoose.model("Advert", advertsSchema);

module.exports = Advert;
