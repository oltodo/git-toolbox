#!/usr/bin/env node

import { Command } from "commander";
import { readPackageSync } from "read-pkg";
import createCommitAmendCommand from "./commands/commit-amend.js";
import { simpleGit } from "simple-git";
import createFixupInteractiveCommand from "./commands/fixup-interative.js";

const pkg = readPackageSync();

const git = simpleGit().outputHandler((cmd, stdout, stderr) => {
  if (cmd === "commit") {
    stdout.pipe(process.stdout);
    stderr.pipe(process.stderr);
  }
});

const program = new Command();

program
  .name("gt")
  .description(pkg.description || "")
  .version(pkg.version)
  .addCommand(createCommitAmendCommand({ git }))
  .addCommand(createFixupInteractiveCommand({ git }));

program.parse(process.argv);
