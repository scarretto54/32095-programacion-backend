module.exports = class {
  constructor(data) {
    this.email = data.email;
    this.first_name = data.first_name;
    this.last_name = data.last_name;
    this.age = data.age;
    this.phone = data.phone;
    this.address = data.address; 
    this.avatarUrl = data.avatarUrl; 
    this.id = data.id;
    this.isAdmin = data.isAdmin;
  }
}
