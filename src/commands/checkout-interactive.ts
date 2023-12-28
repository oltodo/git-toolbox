import { Command } from "commander";
import { GitError } from "simple-git";
import { SubCommand } from "../types.js";
import enquirer from "enquirer";

const createCheckoutInteractiveCommand: SubCommand = ({ git }) => {
  const cmd = new Command("checkout-interactive")
    .alias("coi")
    .description("Pick the branch to checkout")
    .action(async () => {
      try {
        const branches = await git.branchLocal();

        const { branch } = await enquirer.prompt<{ branch: string }>({
          name: "branch",
          message: "Pick the commit",
          type: "autocomplete",
          choices: branches.all,
        });

        await git.checkout(branch);
      } catch (error) {
        if (error instanceof GitError) {
          console.error(error.message);
        }
      }
    });

  return cmd;
};

export default createCheckoutInteractiveCommand;
