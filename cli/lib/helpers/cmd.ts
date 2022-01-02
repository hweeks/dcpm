import { spawn, SpawnOptions } from "child_process";
import chalk = require("chalk");
const warn = (message: string) => console.log(chalk.yellow(message));

interface StandardCmd {
  stdout: string[];
  stderr: string[];
}

export const onComplete = (
  cmd: string,
  options: SpawnOptions
): Promise<StandardCmd> => {
  const createdProcess = spawn(cmd, options);
  return new Promise((resolve, reject) => {
    const logOutput: StandardCmd = {
      stdout: [""],
      stderr: [""],
    };
    createdProcess
      .on("close", () => resolve(logOutput))
      .on("error", () => reject(logOutput));
    if (createdProcess.stdout) {
      createdProcess.stdout.on("data", (datum) => {
        logOutput.stdout.push(datum);
        console.log(`[DCPM] \n${datum.toString()}`);
      });
    }
    if (createdProcess.stderr) {
      createdProcess.stderr.on("data", (datum) => {
        warn(datum.toString());
        logOutput.stderr.push(datum);
      });
    }
  });
};

export const typeSafeExec = async (
  cmd: string,
  options: SpawnOptions
): Promise<StandardCmd> => {
  let logOutput: StandardCmd = {
    stdout: [""],
    stderr: [""],
  };
  try {
    logOutput = await onComplete(cmd, options);
  } catch (error) {
    throw new Error(
      `Command ${cmd} failed with this message: ${(error as any).message}`
    );
  }
  return logOutput;
};

export const runInContext = (
  cmd: string,
  options?: SpawnOptions
): Promise<StandardCmd> => {
  const baseOptions = {
    cwd: process.cwd(),
    env: process.env,
    shell: "/bin/sh",
    ...(options || {}),
  };
  return typeSafeExec(cmd, baseOptions);
};
