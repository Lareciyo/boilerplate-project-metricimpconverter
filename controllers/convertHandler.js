function ConvertHandler() {

  this.getNum = function (input) {
    const numMatch = input.match(/^[\d./]+/);
    if (!numMatch) return 1;

    const numStr = numMatch[0];
    const slashCount = (numStr.match(/\//g) || []).length;
    if (slashCount > 1) return "invalid number";

    if (slashCount === 1) {
      const [num, denom] = numStr.split('/');
      return parseFloat(num) / parseFloat(denom);
    }

    return parseFloat(numStr);
  };

  this.getUnit = function (input) {
    const unitMatch = input.match(/[a-zA-Z]+$/);
    if (!unitMatch) return "invalid unit";

    const unit = unitMatch[0].toLowerCase();
    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];

    if (!validUnits.includes(unit)) return "invalid unit";
    return unit;
  };

  this.getReturnUnit = function (initUnit) {
    const unit = initUnit.toLowerCase();
    const map = {
      gal: "L",
      l: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs"
    };
    return map[unit];
  };

  this.spellOutUnit = function (unit) {
    const u = unit.toLowerCase();
    const map = {
      gal: "gallons",
      l: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms"
    };
    return map[u];
  };

  this.convert = function (initNum, initUnit) {
    const unit = initUnit.toLowerCase();

    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const map = {
      gal: initNum * galToL,
      l: initNum / galToL,
      mi: initNum * miToKm,
      km: initNum / miToKm,
      lbs: initNum * lbsToKg,
      kg: initNum / lbsToKg
    };

    return map[unit];
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
