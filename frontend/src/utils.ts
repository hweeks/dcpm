type TEat = (term: string) => ({type} : {type: string}) => string

export function breaks() {
  const parser = this.Parser
  let tokenizers

  if (!isRemarkParser(parser)) {
    throw new Error('Missing parser to attach `remark-breaks` to')
  }

  tokenizers = parser.prototype.inlineTokenizers

  tokenizeBreak.locator = tokenizers.break.locator

  tokenizers.break = tokenizeBreak

  function tokenizeBreak(eat: TEat, value: string, silent: boolean) {
    const length = value.length
    let index = -1
    let queue = ''
    let character
    while (++index < length) {
      if (value.startsWith('\\n')) {
        if (silent) {
          return true
        }
        queue += value.substr(0,2)
        return eat(queue)({type: 'break'})
      }
      if (character !== ' ') {
        return
      }
      queue += character
    }
  }
}

function isRemarkParser(parser : any) {
  return Boolean(
    parser &&
      parser.prototype &&
      parser.prototype.inlineTokenizers &&
      parser.prototype.inlineTokenizers.break &&
      parser.prototype.inlineTokenizers.break.locator
  )
}
