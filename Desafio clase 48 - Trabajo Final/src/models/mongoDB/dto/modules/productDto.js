module.exports = class {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.category = data.category;
    this.cod = data.cod;
    this.imageURL = data.imageURL;
    this.price = data.price;
    this.stock = data.stock;
    this.timestamp = data.timestamp;     
  }
}
