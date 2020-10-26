const Workflow = require("./src/workflow");
const configLoader = require("./config/loader");
const scripts = require("./config/scripts");

(async () => {
  const workflowConfig = configLoader("./config");
  const logWorkflow = new Workflow(
    workflowConfig.log,
    {
      firstMessage: "I am the first message",
      secondMessage: "I am the second message",
      thirdMessage: "I am the third message"
    },
    scripts
  );
  const workflowOutput = await logWorkflow.perform();
  console.log(workflowOutput);
})();
