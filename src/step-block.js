const Promise = require("bluebird");
const Step = require("./step");

class StepBlock {
  constructor(stepBlock, context) {
    this.steps = stepBlock;
    this.context = context;
    this.context.stepsOutput = this.context.stepOutputs || {};
    this.lastStepExecuted = null;
  }

  async perform() {
    await Promise.each(this.steps, async step => {
      if (this.context.workflow.status !== "finished") {
        const { stepOutput, workflowStatus } = await new Step(
          step,
          this.context
        ).perform();
        this.lastStepExecuted = step;
        this.context.stepsOutput[step.identifier] = stepOutput;
        this.context.workflow.status = workflowStatus;
      }
    });
    return this._getStepBlockReturnValue();
  }

  _getStepBlockReturnValue() {
    return {
      output: this._getLastStepOutput(),
      workflowStatus: this.context.workflow.status
    };
  }

  _getLastStepOutput() {
    return this.context.stepsOutput[this.lastStepExecuted.identifier];
  }
}

module.exports = StepBlock;
