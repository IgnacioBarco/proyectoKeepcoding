"use strict";

export default class Advert {
  name;
  photo;
  description;
  sell;
  price;
  author;
  date;
  tags = [];
  reserved;
  sold;
  chat = [];

  constructor(value) {
    this.name = value.name;
    this.photo = value.photo;
    this.description = value.description;
    this.sell = value.sell;
    this.price = value.price;
    this.author = value.author;
    this.date = value.date;
    this.reserved = value.reserved;
    this.sold = value.sold;
    this.chat = value.chat;
  }
}
