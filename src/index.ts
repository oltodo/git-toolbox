#!/usr/bin/env node

import { Command } from "commander";
import { readPackageSync } from "read-pkg";
import createCommitAmendCommand from "./commands/commit-amend.js";
import { simpleGit } from "simple-git";

const pkg = readPackageSync();

const git = simpleGit().outputHandler((_, stdout, stderr) => {
  stdout.pipe(process.stdout);
  stderr.pipe(process.stderr);
});

const program = new Command();

program
  .name("gt")
  .description(pkg.description || "")
  .version(pkg.version)
  .addCommand(createCommitAmendCommand({ git }));

program.parse(process.argv);
