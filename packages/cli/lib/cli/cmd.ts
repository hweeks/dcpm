import {spawn, SpawnOptionsWithoutStdio} from 'child_process'

interface BuiltLogs {
  stdout: string[],
  stderr: string[]
}

export const onComplete = (cmd : string, options: SpawnOptionsWithoutStdio) : Promise<BuiltLogs> => {
  const createdProcess = spawn(cmd, options)
  return new Promise((resolve, reject) => {
    const logOutput : BuiltLogs = {
      stdout: [''],
      stderr: ['']
    }
    createdProcess
      .on('close', () => resolve(logOutput))
      .on('error', () => reject(logOutput))
    createdProcess.stdout.on('data', (datum) => {logOutput.stdout.push(datum)})
    createdProcess.stderr.on('data', (datum) => {logOutput.stderr.push(datum)})
  })
}

export const typeSafeExec = async (cmd : string, options: SpawnOptionsWithoutStdio) : Promise<BuiltLogs> => {
  let logOutput : BuiltLogs = {
    stdout: [''],
    stderr: ['']
  }
  try {
    logOutput = await onComplete(cmd, options)
  } catch (error) {
    console.warn(`Command ${cmd} failed with this message: ${error.message}`)
  }
  return logOutput
}

export const runInContext = (cmd : string, options: SpawnOptionsWithoutStdio) : Promise<BuiltLogs> => {
  const baseOptions = {
    cwd: process.cwd(),
    env: process.env,
    shell: '/bin/sh',
    ...options
  }
  return typeSafeExec(cmd, baseOptions)
}
