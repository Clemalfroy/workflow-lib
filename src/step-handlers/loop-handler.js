const Base = require("./base");

class LoopHandler extends Base {
  constructor(params) {
    super(params);
    if (!this._verifyParams())
      throw new Error("Wrong params arguments for LoopHandler");
  }

  async perform(context) {
    //TODO: Check for the workflow type
    return this._instantRun(context)
  }

  async _instantRun(context) {
    const interpolatedInputs = this._getInterpolatedInputs(this.params); // TODO: Evaluate the if
    let stepBlock;
    for (let i = 0; this._canRun(i, interpolatedInputs.condition) ; i++) {
      const StepBlock = (await import("../step-block.js")).default
      stepBlock = await new StepBlock(this.params.stepBlock, context).perform();
    }
    return this._getReturnValue(stepBlock.output, stepBlock.workflowStatus)
  }

  _canRun(i, condition) {
    return this._conditionIsValid(condition) && this._isLessThanMaxAttempts(i)
  }

  _conditionIsValid(condition) {
    return (!this.params.condition || (this.params.condition && condition))
  }

  _isLessThanMaxAttempts(i) {
    return (!this.params.maxAttempts || (this.params.maxAttempts && i < this.params.maxAttempts))
  }

  _verifyParams() {
    return this.params.maxAttempts || this.params.condition;
  }
}

module.exports = LoopHandler;
