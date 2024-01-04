import { Command } from "commander";
import { GitError } from "simple-git";
import { SubCommand } from "../types.js";
import enquirer from "enquirer";

const createFixupInteractiveCommand: SubCommand = ({ git }) => {
  const cmd = new Command("fixup-interactive")
    .alias("fxi")
    .description("Create a fixup commit by picking the base one")
    .action(async () => {
      try {
        const commits = await git.log({ maxCount: 100 });

        const { commit } = await enquirer.prompt<{ commit: string }>({
          type: "select",
          name: "commit",
          message: "Pick the commit",
          choices: commits.all.map((commit) => ({
            name: commit.hash,
            message: commit.message,
          })),
        });

        await git.raw("commit", "--fixup", commit);
      } catch (error) {
        if (error instanceof GitError) {
          console.error(error.message);
        }
      }
    });

  return cmd;
};

export default createFixupInteractiveCommand;
