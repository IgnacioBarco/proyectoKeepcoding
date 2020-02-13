"use strict";

export default class Anuncio {
  nombre;
  foto;
  descripcion;
  venta;
  precio;
  autor;
  fecha;
  tags = [];
  reservado;
  vendido;
  chat = [];

  constructor(value) {
    this.nombre = value.nombre;
    this.foto = value.foto;
    this.descripcion = value.descripcion;
    this.venta = value.venta;
    this.precio = value.precio;
    this.autor = value.autor;
    this.fecha = value.fecha;
    this.reservado = value.reservado;
    this.vendido = value.vendido;
    this.chat = value.chat;
  }
}
