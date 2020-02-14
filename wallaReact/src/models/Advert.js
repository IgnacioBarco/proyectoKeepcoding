export default class Advert {
    _id;
    name;
    description;
    price;
    type;
    photo;
    tags = [];
    createdAt;
    updatedAt;

    constructor(value) {
        this._id = value._id;
        this.name = value.name;
        this.description = value.description;
        this.price = value.price;
        this.type = value.type;
        this.photo = value.photo;
        this.tags = value.tags;
        this.createdAt = value.createdAt;
        this.updatedAt = value.updatedAt;

    }

}