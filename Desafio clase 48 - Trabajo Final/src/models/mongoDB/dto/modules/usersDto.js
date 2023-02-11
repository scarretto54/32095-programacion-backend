module.exports = class {
  constructor(data) {
    this.email = data.email;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.age = data.age;
    this.phone = data.phone;
    this.address = data.address; 
    this.avatarUrl = data.avatarUrl; 
    this._id = data._id;
    this.isAdmin = data.isAdmin;
    // data.id || data._id ? (this.id = data.id || data._id.toString()) : null;    
  }
}
