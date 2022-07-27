const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    code: String,
    title: {
      type: String,
      required: true,
    },
    description: String,
    price: Number,
    quantity: Number,
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

module.exports = mongoose.model("Product", ProductSchema);
