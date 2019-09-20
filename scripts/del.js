/*
 * @Author: daief
 * @LastEditors: daief
 * @Date: 2019-09-20 09:47:08
 * @LastEditTime: 2019-09-20 09:50:15
 * @Description:
 * @ref: https://github.com/sindresorhus/del-cli/blob/master/cli.js
 */
"use strict";
const meow = require("meow");
const del = require("del");

const cli = meow(
  `
	Usage
	  $ del <path|glob> …
	Options
	  --force, -f    Allow deleting the current working directory and outside
	  --dry-run, -d  List what would be deleted instead of deleting
	Examples
	  $ del unicorn.png rainbow.png
	  $ del "*.png" "!unicorn.png"
`,
  {
    flags: {
      force: {
        type: "boolean",
        alias: "f"
      },
      dryRun: {
        type: "boolean",
        alias: "d"
      }
    }
  }
);

if (cli.input.length === 0) {
  console.error("Specify at least one path");
  process.exit(1);
}

(async () => {
  const files = await del(cli.input, cli.flags);

  if (cli.flags.dryRun) {
    console.log(files.join("\n"));
  }
})();
