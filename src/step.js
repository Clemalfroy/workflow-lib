const stepHandlers = require("./step-handlers");

class Step {
  constructor(config, context) {
    this.identifier = config.identifier;
    this.properties = config.properties;
    this.context = context;
  }

  async perform() {
    return new stepHandlers[this.properties.type](
      this.properties.params
    ).perform(this.context);
  }
}

module.exports = Step;
