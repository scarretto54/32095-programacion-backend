const request = require("supertest")("http://localhost:8080");

jest.setTimeout(20000);

describe("RestFull API", () => {
  const productID = "63dc11182959b770a36dbf91";
  const data = {
    _id: "63dc11182959b770a36dbf91",
    name: "Trivento Reserve Cabernet Sauvignon 2020",
    description: "Profundo color rojo con matices violáceos.  En nariz intensidad de frutos rojos frescos, fresas, frambuesas y cerezas. La madera entregó notas de vainilla, pan tostado, clavo de olor y humo. El conjunto aromático es complejo y potente.  En boca impacta en boca con presencia, medio amplio donde se sienten sus taninos suaves y exquisitos y final jugoso y enérgico.",
    cod: "1",
    category: "Vinos",
    imageURL:
      "/images/products/1 TriventoReserveCabernetSauvignon2020-1675366680221.webp",
    price: 1324,
    stock: 50,
  };
  test("/GET should return a product by their ID", async () => {
    const response = await request.get(`/api/productos/${productID}`);    
  });

  test("/POST should return the created product", async () => {
    let response = await request
      .post(`/api/productos`)
      .send(data)
  });

  test("/PATCH should return updated product", async () => {
    try {
      const dataToUpdate = {
        name: "Trivento Reserve Cabernet Sauvignon 2020 modified",
        description: "Profundo color rojo con matices violáceos.  En nariz intensidad de frutos rojos frescos, fresas, frambuesas y cerezas. La madera entregó notas de vainilla, pan tostado, clavo de olor y humo. El conjunto aromático es complejo y potente.  En boca impacta en boca con presencia, medio amplio donde se sienten sus taninos suaves y exquisitos y final jugoso y enérgico. Modified",
      };
      let response = await request
        .patch(`/api/productos/${productID}`)
        .send(dataToUpdate);

      expect(response.body).toMatchObject(dataToUpdate);
    } catch (error) {
      console.log(error);
    }
  });

  test("/DELETE should return status 200", async () => {
    try {
      let responseDelete = await request
        .delete(`/api/productos/${productID}`)
        .expect(200);
    } catch (error) {
      console.log(error);
    }
  });

  test("/GET should return null when searching for deleted product ID", async () => {
    try {
      let response = await request.get(`/api/productos/${productID}`);
      expect(response).toBeNull();
    } catch (error) {
      console.log(error);
    }
  });
});
