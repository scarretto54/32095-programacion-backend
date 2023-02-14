const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const CartSchema = new Schema(
  {
    date: { type: Date, default: Date.now },
    user: {
      type: ObjectId,
      ref: "User",
    },
    products: [
  //  {  _id:{type: ObjectId, ref: "Product"},
  //     qty: {type: Number, ref: "qty",},}
  
  // {type: ObjectId, ref: "Product"}

  {
  _id:{type: String},
  name: {type:String},
  description: {type:String,},
  category: {type:String,},
  imageURL: {type:String,},
  price: {type:Number,},
  stock: {type:Number,},
  cod: {type:Number,},
  qty: {type: Number},
}
    ],
  },
  { timestamps: true, collection: "carrito" }
);
CartSchema.set("toJSON", { virtuals: true });

module.exports = model("Cart", CartSchema);
