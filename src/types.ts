import { Command } from "commander";
import { SimpleGit } from "simple-git";

export type SubCommand = (args: { git: SimpleGit }) => Command;
