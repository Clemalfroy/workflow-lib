const ScriptHandler = require("./script-handler");
const ConditionalHandler = require("./conditional-handler");
const ReturnHandler = require("./return-handler");
const WebhookHandler = require("./webhook-handler");
const LoopHandler = require("./loop-handler");

module.exports = {
  script: ScriptHandler,
  conditional: ConditionalHandler,
  return: ReturnHandler,
  webhook: WebhookHandler,
  loop: LoopHandler
};
