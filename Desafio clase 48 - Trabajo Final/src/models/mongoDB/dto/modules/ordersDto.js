module.exports = class {
  constructor(data) {
    this.products = data.products;
    this.total = data.total;
    this.orderNumber = data.orderNumber;
    this.date = data.date;
    this.state = data.state;
    this.user = data.user;    
    this._id = data._id;
    // data.id || data._id ? (this.id = data.id || data._id.toString()) : null;    
  }
}
