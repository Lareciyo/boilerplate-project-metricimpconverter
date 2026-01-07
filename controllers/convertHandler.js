function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    const index = input.search(/[a-zA-Z]/);
    const numStr = index === -1 ? input : input.slice(0, index);

    // Default to 1 if no number is provided
    if (!numStr) return 1;

    // Check for multiple slashes
    const slashCount = (numStr.match(/\//g) || []).length;
    if (slashCount > 1) return 'invalid number';

    // Handle fraction with optional decimal
    if (slashCount === 1) {
      const [num, den] = numStr.split('/');
      if (num === '' || den === '') return 'invalid number';
      const n = parseFloat(num);
      const d = parseFloat(den);
      if (isNaN(n) || isNaN(d) || d === 0) return 'invalid number';
      return n / d;
    }

    // Handle plain number or decimal
    const val = parseFloat(numStr);
    if (isNaN(val)) return 'invalid number';

    return val;
  };
  
  this.getUnit = function(input) {
    let result;
    const index = input.search(/[a-zA-Z]/);
    result = index === -1 ? '' : input.slice(index).trim();

    const validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    const lower = result.toLowerCase();

    if (!validUnits.includes(lower)) return 'invalid unit';
    return lower === 'l' ? 'L' : lower;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    const map = {
      gal: 'L',
      L: 'gal',
      mi: 'km',
      km: 'mi',
      lbs: 'kg',
      kg: 'lbs'
    };
    result = map[initUnit];
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    const spell = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    result = spell[unit];
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal': result = initNum * galToL; break;
      case 'L': result = initNum / galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg': result = initNum / lbsToKg; break;
      case 'mi': result = initNum * miToKm; break;
      case 'km': result = initNum / miToKm; break;
      default: result = null;
    }

    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    const spell = {
      gal: 'gallons',
      L: 'liters',
      mi: 'miles',
      km: 'kilometers',
      lbs: 'pounds',
      kg: 'kilograms'
    };
    result = `${initNum} ${spell[initUnit]} converts to ${returnNum} ${spell[returnUnit]}`;
    return result;
  };
}

module.exports = ConvertHandler;
