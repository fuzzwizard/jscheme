const { standard_env } = require('./env')
const { Atom } = require('./atom')
const {
  log, logln, readln, newline, 
  is_list_type, is_symbol_type
} = require('./util')

Object.prototype.json = function () {
  return JSON.stringify(this, null, '  ')
}

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

    // Eat the tokens until we hit an ending paren
    while (tokens[0] !== ')') node.push(read(tokens))
    tokens.shift() // Ditch the ending paren

    return node
  } else if (token === ')') {
    // We've gone too far!
    throw new SyntaxError('Unexpected delimiter: ")"')
  } else {
    // Return an atom of the token
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

const evaluate = (x, env = standard_env) => {
  const leftmost = x[0]

  // Return env variable
  if (is_symbol_type(x)) {
    const candidate = env[x.value]
    if (!candidate) {
      throw new TypeError(`Symbol(${x.value}) is undefined.`)
    }
    return candidate
  } 
  // Return atom
  else if (!Array.isArray(x)) {
    return x.value
  }
  // 'if' proc
  else if (leftmost === 'if') {
    const [_, test, consequence, alternative] = x.value
    const expression = evaluate(test, env) ? consequence : alternative
    return evaluate(expression, env)
  }
  // 'define' proc
  else if (leftmost === 'define') {
    const [_, identifier, expression] = x.value
    env[identifier] = evaluate(expression, env)
  }
  // proceedure call
  else {
    const proc = evaluate(leftmost, env)
    logln(`proc is: ${proc}`)
    const args = x.slice(1).map(arg => evaluate(arg, env))
    logln(`args are: ${args}`)
    logln(`result should be: ${proc(...args)}`)
    return proc(...args)
  }
}

const execute = program => evaluate(parse(program))

const repl = (prompt = '>> ') => {
  process.stdin.setEncoding('utf8') // do we need this?

  let val
  while (true) {
    log(prompt)
    val = execute(readln())
    if (val !== '') logln(val)
  }
}



module.exports = { execute, parse, evaluate, repl, read, tokenize }
