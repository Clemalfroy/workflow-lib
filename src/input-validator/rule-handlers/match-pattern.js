const Base = require("./base");

class MatchPattern extends Base {
  validate(input, ruleParam) {
    return new RegExp(ruleParam).test(this.target);
  }
}

module.exports = MatchPattern;
