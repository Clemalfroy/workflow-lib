const yaml = require("js-yaml");
const fs = require("fs");
const { join } = require("path");

const loader = dirname => {
  return fs
    .readdirSync(dirname)
    .filter(fileName => /\.yml$/.test(fileName))
    .map(fileName =>
      yaml.safeLoad(fs.readFileSync(join(dirname, fileName), "utf8"))
    )
    .flat()
    .reduce((acc, current) => {
      acc[current.name] = current;
      return acc;
    }, {});
};

module.exports = loader;
