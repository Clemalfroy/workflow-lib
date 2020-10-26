const uuid = require("uuid");
const StepBlock = require("./step-block");

class Workflow {
  constructor(config, input, scripts) {
    this.config = config;
    this.input = input;
    this.scripts = scripts;
    this.id = uuid.v4();
  }

  async perform() {
    return (
      await new StepBlock(this.config.stepBlock, {
        workflow: {
          id: this.id,
          type: this.config.type,
          input: this.input,
          scripts: this.scripts
        }
      }).perform()
    ).output;
  }
}

module.exports = Workflow;
