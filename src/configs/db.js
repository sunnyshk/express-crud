const mongoose = require("mongoose");

module.exports = () => {
  return mongoose.connect(
    "mongodb+srv://sunnyshk:adminadmin@cluster0.zobmn.mongodb.net/TechnokartInvoice"
  );
};
