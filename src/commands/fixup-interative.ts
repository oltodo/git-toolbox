import { Command } from "commander";
import { DefaultLogFields, GitError } from "simple-git";
import { SubCommand } from "../types.js";
import enquirer from "enquirer";

const createFixupInteractiveCommand: SubCommand = ({ git }) => {
  const cmd = new Command("fixup-interactive")
    .alias("fxi")
    .description("Create a fixup commit by picking the base one")
    .action(async () => {
      try {
        const commits = await git.log({ maxCount: 100 });

        const { commit } = await enquirer.prompt<{ commit: DefaultLogFields }>({
          type: "select",
          name: "commit",
          message: "Pick the commit",
          choices: commits.all.map((commit) => ({
            name: commit.message,
            value: commit,
          })),
        });

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
