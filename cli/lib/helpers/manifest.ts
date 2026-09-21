import { promisify } from "util";
import fs from "fs";
import yaml from "js-yaml";
import inquirer, { InputQuestion, Answers, Question } from "inquirer";

const asyncRead = promisify(fs.readFile);
const asyncStat = promisify(fs.stat);

export interface ExtraConfigFile {
  template: string;
  questions: Question[];
  output: string;
}

export interface BlobManifest {
  about: {
    name: string;
    author: string;
    about: string;
    version: string;
    tags: string[];
  };
  remotes: {
    scm: string;
    blobs: string;
  };
  config: string;
  overrides: {
    [key: string]: string;
  };
  supports: {
    docker: string;
    "docker-compose": string;
  };
  scripts?: {
    [key: string]: string;
  };
  env?: Question[];
  extraConfigs?: ExtraConfigFile[];
}

export const getManifest = async (pathIn: string) => {
  const manifestPath = `${pathIn}/manifest.yml`;
  const checkForFile = await asyncStat(manifestPath);
  if (checkForFile.isFile()) {
    const manifestFile = await asyncRead(manifestPath, "utf8");
    const dcpmConfig: BlobManifest = yaml.safeLoad(manifestFile);
    return dcpmConfig;
  } else {
    throw new Error(
      `There's no manifest at ${manifestPath}, what's up with that?`
    );
  }
};

export const runConfigBuilder = (questions: Question[]): Promise<Answers> => {
  if (questions.length === 0) {
    throw new Error(
      "It is very hard for me to ask questions without structure, this is not a therapy session."
    );
  }
  return new Promise((resolve, reject) => {
    inquirer
      .prompt(questions)
      .then((answers) => resolve(answers))
      .catch((err) => {
        reject(
          new Error(
            `We couldn't ask any questions because of this: ${err.message}`
          )
        );
      });
  });
};
