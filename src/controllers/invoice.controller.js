const express = require("express");

const router = express.Router();

const Invoice = require("../models/invoice.models");

//code/route for creating a invoice
router.post("", async (req, res) => {
  let arr = [];
  try {
    let isLess = await Invoice.find({
      invoiceNumber: { $lt: req.body.invoiceNumber },
    });
    let isMore = await Invoice.find({
      invoiceNumber: { $gt: req.body.invoiceNumber },
    });
    if (isLess.length == 0) {
      const firstInvoice = await Invoice.create(req.body);
      return res.status(201).send(firstInvoice);
    }
    if (isMore.length == 0) {
      if (req.body.invoiceDate < isLess[isLess.length - 1].invoiceDate) {
        return res
          .status(500)
          .send(
            `Date for this invoice cannot be smaller than ${
              isLess[isLess.length - 1].invoiceDate
            }`
          );
      }
      const secondInvoice = await Invoice.create(req.body);
      return res.status(201).send(secondInvoice);
    }
    if (isLess.length != 0) {
      arr.push(isLess);
      let index = 0;
      for (let i = 0; i < arr[0].length; i++) {
        if (arr[0][i].invoiceNumber < req.body.invoiceNumber) {
          index = i;
        }
      }
      if (req.body.invoiceDate < arr[0][index].invoiceDate) {
        return res
          .status(500)
          .send(
            `Date for this invoice cannot be less than ${arr[0][index].invoiceDate}`
          );
      }
    }
    let arr2 = [];
    if (isMore.length != 0) {
      arr2.push(isMore);
      let index = 0;
      for (let i = 0; i < arr2[0].length; i++) {
        if (arr2[0][i].invoiceNumber > req.body.invoiceNumber) {
          index = i;
          break;
        }
      }
      if (req.body.invoiceDate > arr2[0][index].invoiceDate) {
        return res
          .status(500)
          .send(
            `Date for this invoice cannot be greater than ${arr2[0][index].invoiceDate}`
          );
      }
    }
    const invoice = await Invoice.create(req.body);
    return res.status(201).send(invoice);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

//code/route to get all the invoices from the database
router.get("", async (req, res) => {
  try {
    const getAll = await Invoice.find();
    return res.status(200).send(getAll);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//code/route to update a specific invoice from the database
router.patch("", async (req, res) => {
  try {
    const update = await Invoice.findOneAndUpdate(
      { invoiceNumber: req.body.invoiceNumber },
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).send(update);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

//code/route to delete a particular invoice from the database
router.delete("", async (req, res) => {
  try {
    let toDel = await Invoice.deleteOne({
      invoiceNumber: req.body.invoiceNumber,
    });
    return res.status(201).send(toDel);
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
