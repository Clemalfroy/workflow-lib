const { get } = require("lodash");

class Base {
  constructor(params) {
    this.params = params;
  }

  _getInterpolatedInputs(object, context) {
    return Object.fromEntries(
      Object.entries(object).map(([k, v]) => {
        return [k, this._interpolate(v, context)];
      })
    );
  }

  _getReturnValue(stepOutput, workflowStatus = "running") {
    return {
      stepOutput,
      workflowStatus
    };
  }

  _interpolate(value, context) {
    if (!/^::/.test(value)) return value;
    const [, path] = value.match(/^::(.*)/);
    return get(context, path, undefined);
  }
}

module.exports = Base;
