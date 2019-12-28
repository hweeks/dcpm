import { parseInput, ParsingInput } from "../../lib/routes/blob";

describe('Blobs', () => {
  describe('input parsing', () => {
    interface IterArgs {
      name: string,
      value: any,
      expected: string
    }
    it.each`
      name         | value    | expected
      ${'name'}    | ${false} | ${'name'}
      ${'author'}  | ${false} | ${'author'}
      ${'about'}   | ${false} | ${'about'}
      ${'version'} | ${false} | ${'version'}
      ${'scm'}     | ${false} | ${'scm'}
      ${'token'}   | ${false} | ${'token'}
    `('throws $expected error when $name is $value', ({name, value, expected}: IterArgs) => {
      let configObject = {
        name: 'name', author: 'author', about: 'about', version: '1.0.0', scm: 'scm', token: 'token'
      } as {[key : string]: any}
      configObject[name] = value
      let message = ''
      try {
        parseInput(configObject as ParsingInput)
      } catch (error) {
        message = error.message
      }
      expect(message).toContain(expected)
    })
  })
})
