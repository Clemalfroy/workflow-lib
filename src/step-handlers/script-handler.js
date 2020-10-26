const Base = require("./base");

class ScriptHandler extends Base {
  constructor(params) {
    super(params);
    if (!this._verifyParams())
      throw new Error("Wrong params arguments for ScriptHandler");
  }

  async perform(context) {
    const inputs = this._getInterpolatedInputs(this.params.inputs, context);
    return this._getReturnValue(
      await this._runScript(
        this.params.scriptName,
        context.workflow.scripts,
        inputs
      )
    );
  }

  async _runScript(script, scriptsConfig, inputs) {
    return scriptsConfig[script](inputs);
  }

  _verifyParams() {
    return !!this.params.inputs;
  }
}
module.exports = ScriptHandler;
