const fs = require("fs");
const glob = require("glob");

const rules = [
  ["src/", "core/"],
  ["plugins/", "infra/plugins/"],
  ["logs/", "runtime/logs/"],
  ["temp/", "runtime/temp/"]
];

glob("**/*.{js,ts}", (err, files) => {
  files.forEach(file => {
    let code = fs.readFileSync(file, "utf8");

    const original = code;

    rules.forEach(([from, to]) => {
      code = code.replaceAll(from, to);
    });

    if (code !== original) {
      fs.writeFileSync(file, code);
      console.log("修正:", file);
    }
  });
});