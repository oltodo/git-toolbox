#!/usr/bin/env node

import { Command } from "commander";
import { readPackageSync } from "read-pkg";
import createCommitAmendCommand from "./commands/commit-amend.js";
import { simpleGit } from "simple-git";
import createFixupInteractiveCommand from "./commands/fixup-interative.js";
import createCheckoutInteractiveCommand from "./commands/checkout-interactive.js";

const pkg = readPackageSync();

const git = simpleGit().outputHandler((_, stdout, stderr, args) => {
  if (args[0] && ["commit", "checkout"].includes(args[0])) {
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
  .addCommand(createFixupInteractiveCommand({ git }))
  .addCommand(createCheckoutInteractiveCommand({ git }));

program.parse(process.argv);
