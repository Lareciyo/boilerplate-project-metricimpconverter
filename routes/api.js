"use strict";

const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  const convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    const input = req.query.input;

    const num = convertHandler.getNum(input);
    const unit = convertHandler.getUnit(input);

    if (num === "invalid number" && unit === "invalid unit") {
      return res.send("invalid number and unit");
    }

    if (num === "invalid number") {
      return res.send("invalid number");
    }

    if (unit === "invalid unit") {
      return res.send("invalid unit");
    }

    const returnUnit = convertHandler.getReturnUnit(unit);
    const returnNum = convertHandler.convert(num, unit);

    res.json({
      initNum: num,
      initUnit: unit === "l" ? "L" : unit,
      returnNum: Number(returnNum.toFixed(5)),
      returnUnit: returnUnit === "l" ? "L" : returnUnit,
      string: convertHandler.getString(
        num,
        unit,
        Number(returnNum.toFixed(5)),
        returnUnit
      ),
    });
  });
};
