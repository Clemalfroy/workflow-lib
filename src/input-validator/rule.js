const { get } = require("lodash");
const handlers = require("./rule-handlers");

class Rule {
  constructor(config) {
    this.config = config;
  }

  validate(input) {
    const target = get(input, this.config.target);
    return this.config.handlers.every(handler => {
      return Object.entries(handler).every(([k, v]) =>
        new handlers[k](target).validate(input, v)
      );
    });
  }
}

module.exports = Rule;
