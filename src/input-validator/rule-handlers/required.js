const Base = require("./base");

class Required extends Base {
  validate(input, ruleParam) {
    return !(typeof this.target === "undefined" || this.target === null);
  }
}

module.exports = Required;
