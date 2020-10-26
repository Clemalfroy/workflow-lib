const Base = require("./base");

class ConditionalHandler extends Base {
  constructor(params) {
    super(params);
    if (!this._verifyParams())
      throw new Error("Wrong params arguments for ConditionalHandler");
  }

  async perform(context) {
    const interpolatedInputs = this._getInterpolatedInputs(this.params); // TODO: Evaluate the if
    if (!interpolatedInputs.condition) return null;
    const StepBlock = (await import("../step-block.js")).default
    const stepBlock = await new StepBlock(this.params.stepBlock, context).perform();
    return this._getReturnValue(stepBlock.output, stepBlock.workflowStatus)
  }

  _verifyParams() {
    return this.params.condition && this.params.stepBlock;
  }
}

module.exports = ConditionalHandler;
