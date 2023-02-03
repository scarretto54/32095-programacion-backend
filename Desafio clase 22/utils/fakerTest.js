const faker = require('faker') 
faker.locale = 'es'

function fakerTest() {
  return {
    title: faker.commerce.product(),
    price: Number(faker.commerce.price()),
    thumbnail:faker.image.imageUrl(),
  }
}

module.exports = {fakerTest}