import { Command } from "commander";
import { GitError } from "simple-git";
import { SubCommand } from "../types.js";

const createCommitAmendCommand: SubCommand = ({ git }) => {
  const cmd = new Command("commit-amend")
    .alias("cia")
    .description(
      "Amend the HEAD commit with staged changes keeping the same message",
    )
    .action(async () => {
      try {
        await git.raw("commit", "--amend", "--no-edit");
      } catch (error) {
        if (error instanceof GitError) {
          console.error(error.message);
        }
      }
    });

  return cmd;
};

export default createCommitAmendCommand;
