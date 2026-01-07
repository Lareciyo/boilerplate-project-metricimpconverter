function ConvertHandler() {

  this.getNum = function (input) {
    const result = input.match(/^[\d./]+/);

    if (!result) return 1;

    const num = result[0];

    if ((num.match(/\//g) || []).length > 1) {
      return 'invalid number';
    }

    if (num.includes('/')) {
      const [numerator, denominator] = num.split('/');
      return parseFloat(numerator) / parseFloat(denominator);
    }

    return parseFloat(num);
  };

 this.getUnit = function (input) {
  const result = input.match(/[a-zA-Z]+$/);
  if (!result) return 'invalid unit';

  const unit = result[0];

  const validUnits = {
    gal: 'gal',
    l: 'L',
    L: 'L',
    mi: 'mi',
    km: 'km',
    lbs: 'lbs',
    kg: 'kg'
  };

  if (!validUnits[unit.toLowerCase()]) {
    return 'invalid unit';
  }

  return validUnits[unit.toLowerCase()];
};


  this.getReturnUnit = function (initUnit) {
    const map = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };

    return map[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const map = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };

    return map[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    const map = {
      gal: initNum * galToL,
      L: initNum / galToL,
      mi: initNum * miToKm,
      km: initNum / miToKm,
      lbs: initNum * lbsToKg,
      kg: initNum / lbsToKg
    };

    return Number(map[initUnit].toFixed(5));
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
