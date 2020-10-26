const superagent = require("superagent");
const Base = require("./base");

class WebhookHandler extends Base {
  constructor(params) {
    super(params);
    if (!this._verifyParams())
      throw new Error("Wrong params arguments for WebhookHandler");
  }

  async perform(context) {
    const interpolatedInputs = this._getInterpolatedInputs(
      this.params,
      context
    );
    const response = await this._sendWebhook(interpolatedInputs);
    return this._getReturnValue(
      response.type.includes("json") ? response.body : response.text
    );
  }

  async _sendWebhook({ url, method, headers, payload, queryParams }) {
    return superagent[method.toLower()](url)
      .set(headers)
      .query(queryParams)
      .send(payload);
  }

  _verifyParams() {
    const allowedMethods = ["post", "get", "delete", "put"];
    return (
      this.params.url &&
      this.params.method &&
      allowedMethods.includes(this.params.method.toLower())
    );
  }
}
module.exports = WebhookHandler;
