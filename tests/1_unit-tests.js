const chai = require("chai");
const assert = chai.assert;

const ConvertHandler = require("../controllers/convertHandler.js");
const convertHandler = new ConvertHandler();

describe("Unit Tests", function () {
  describe("Reading input number", function () {
    it("convertHandler should correctly read a whole number input.", function () {
      assert.equal(convertHandler.getNum("32L"), 32);
    });

    it("convertHandler should correctly read a decimal number input.", function () {
      assert.equal(convertHandler.getNum("3.2kg"), 3.2);
    });

    it("convertHandler should correctly read a fractional input.", function () {
      assert.equal(convertHandler.getNum("1/2mi"), 0.5);
    });

    it("convertHandler should correctly read a fractional input with a decimal.", function () {
      assert.equal(convertHandler.getNum("1.5/3kg"), 0.5);
    });

    it("convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).", function () {
      assert.equal(convertHandler.getNum("3/2/3kg"), "invalid number");
    });

    it("convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.", function () {
      assert.equal(convertHandler.getNum("kg"), 1);
    });
  });

  describe("Reading input unit", function () {
    it("convertHandler should correctly read each valid input unit.", function () {
      const units = ["gal", "L", "mi", "km", "lbs", "kg"];

      units.forEach((unit) => {
        assert.equal(convertHandler.getUnit(`1${unit}`), unit.toLowerCase());
      });
    });

    it("convertHandler should correctly return an error for an invalid input unit.", function () {
      assert.equal(convertHandler.getUnit("32g"), "invalid unit");
    });
  });

  describe("Return unit", function () {
    it("convertHandler should return the correct return unit for each valid input unit.", function () {
      const inputUnits = ["gal", "L", "mi", "km", "lbs", "kg"];
      const expectedUnits = ["L", "gal", "km", "mi", "kg", "lbs"];

      inputUnits.forEach((unit, i) => {
        assert.equal(convertHandler.getReturnUnit(unit), expectedUnits[i]);
      });
    });
  });

  describe("Spelled-out unit", function () {
    it("convertHandler should correctly return the spelled-out string unit for each valid input unit.", function () {
      const units = {
        gal: "gallons",
        L: "liters",
        mi: "miles",
        km: "kilometers",
        lbs: "pounds",
        kg: "kilograms",
      };

      for (let unit in units) {
        assert.equal(convertHandler.spellOutUnit(unit), units[unit]);
      }
    });
  });

  describe("Unit conversions", function () {
    it("convertHandler should correctly convert gal to L.", function () {
      assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.0001);
    });

    it("convertHandler should correctly convert L to gal.", function () {
      assert.approximately(convertHandler.convert(1, "L"), 0.26417, 0.0001);
    });

    it("convertHandler should correctly convert mi to km.", function () {
      assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.0001);
    });

    it("convertHandler should correctly convert km to mi.", function () {
      assert.approximately(convertHandler.convert(1, "km"), 0.62137, 0.0001);
    });

    it("convertHandler should correctly convert lbs to kg.", function () {
      assert.approximately(convertHandler.convert(1, "lbs"), 0.45359, 0.0001);
    });

    it("convertHandler should correctly convert kg to lbs.", function () {
      assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.0001);
    });
  });
});
