const express = require("express");

const app = express();

app.use(express.json());

const invoiceController = require("./src/controllers/invoice.controller");

//Route for creating a invoice
app.use("/createInvoice", invoiceController);

//Route for getting all the data from the database
app.use("/getAll", invoiceController);

//Route for updating a single enitiy/data in the database
app.use("/updateInvoice", invoiceController);

//Route to delete a specific invoice from the database
app.use("/deleteInvoice", invoiceController);

module.exports = app;
