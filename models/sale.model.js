// The sale model using mongdb

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const saleSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 1,
      max: 99,
    },
    description: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model("Sale", saleSchema);

module.exports = Sale;
