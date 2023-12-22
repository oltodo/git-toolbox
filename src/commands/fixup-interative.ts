import { Command } from "commander";
import { DefaultLogFields, GitError } from "simple-git";
import { SubCommand } from "../types.js";
import inquirer from "inquirer";

const createFixupInteractiveCommand: SubCommand = ({ git }) => {
  const cmd = new Command("fixup-interactive")
    .alias("fxi")
    .description("Create a fixup commit by picking the base one")
    .action(async () => {
      const commits = await git.log({ maxCount: 100 });

      const { commit } = await inquirer.prompt<{ commit: DefaultLogFields }>([
        {
          name: "commit",
          message: "Pick the commit",
          type: "list",
          choices: commits.all.map((commit) => ({
            name: commit.message,
            value: commit,
          })),
        },
      ]);

      try {
        await git.raw("commit", "--fixup", commit.hash);
      } catch (error) {
        if (error instanceof GitError) {
          console.error(error.message);
        }
      }
    });

  return cmd;
};

export default createFixupInteractiveCommand;
