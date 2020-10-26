const Base = require("./base");

class ReturnHandler extends Base {
  constructor(params) {
    super(params);
    if (!this._verifyParams())
      throw new Error("Wrong params arguments for ReturnHandler");
  }

  async perform(context) {
    return this._getReturnValue(
      this._getInterpolatedInputs(this.params.data, context),
      "finished"
    );
  }

  _verifyParams() {
    return !!this.params.data;
  }
}
module.exports = ReturnHandler;
