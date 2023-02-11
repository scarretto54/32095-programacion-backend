module.exports = class {
  constructor(data) {
    this.name = data.name;
    this.description = data.description;
    this.category = data.category;
    this.cod = data.cod;
    this.imageURL = data.imageURL;
    this.price = data.price;
    this.stock = data.stock;
    this.timestamp = data.timestamp; 
    this._id = data._id;
    // data.id || data._id ? (this.id = data.id || data._id.toString()) : null;    
  }
}
