const Rule = require("./rule");

class InputValidator {
  constructor(rules, input) {
    this.rules = rules;
    this.input = input;
  }

  validate() {
    return this.rules.every(r => new Rule(r).validate(this.input));
  }
}

module.exports = InputValidator;
