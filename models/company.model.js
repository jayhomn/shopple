const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const companySchema = new Schema(
  {
    companyEmail: {
      type: String,
    },
    companyName: {
      type: String,
      required: true,
      unique: true,
    },
    sales: [
      {
        type: Schema.Types.ObjectId,
        ref: "Sale",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Company = mongoose.model("Company", companySchema);

module.exports = Company;
