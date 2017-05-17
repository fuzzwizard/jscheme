const { standard_env } = require('./env')
const { Atom } = require('./atom')
const {
  log, logln, newline, is_list_type
} = require('./util')

const not_implemented = feature => {
  logln(`The feature known as ${feature} hasn\'t been implemented yet!`)
  return Atom(null)
}

const read = tokens => {
  if (tokens.length === 0) {
    throw new SyntaxError('Unexpected end of input.')
  }

  const token = tokens.shift()

  if (token === '(') {
    const node = []
    while (tokens[0] !== ')') {
      node.push(read(tokens))
    }
    tokens.shift() // Ditch the ')'
    return node
  } else if (token === ')') {
    throw new SyntaxError('Unexpected delimiter: ")"')
  } else {
    return Atom(token)
  }
}

// Excrutiatingly simple ATM but that's all we're looking for
const tokenize = chars =>
  chars
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .split(/[\s]+/g)
    .filter(x => x !== '')

const parse = program => read(tokenize(program))

const evaluate = (x, enviroment = standard_env) => {
  const leftmost = x[0]

  if (is_symbol(x)) {
    return enviroment[x]
  } else if (!is_list(x)) {
    return x
  } else if (leftmost === 'if') {       // 'if' proc
    const [_, test, consequence, alternative] = x
    const expression = evaluate(test, enviroment) ? consequence : alternative
    return evaluate(expression, enviroment)
  } else if (leftmost === 'define') {   // 'define' proc
    const [_, identifier, expression] = x
    enviroment[identifier] = evaluate(expression, enviroment)
  } else {                              // Proceedure call
    const proc = evaluate(leftmost, enviroment)
    const args = x.slice(1).map(arg => evaluate(arg, env))
    return proc(...args)
  }
}

const execute = program => evaluate(parse(program))

const repl = (prompt = '>> ') => {
  process.stdin.setEncoding('utf8') // do we need this?

  let val
  while (true) {
    log(prompt)
    val = execute(process.stdin.read())
    if (val !== '') logln(val)
  }
}



module.exports = { execute, parse, evaluate, repl, read, tokenize }
