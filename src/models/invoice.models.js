const mongoose = require("mongoose");

//This is the schema for Invoice Details

const invoiceSchema = new mongoose.Schema(
  {
    invoiceDate: {
      type: String,
      // default: Date.now(),
      require: true,
    },
    invoiceNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("invoice", invoiceSchema);
