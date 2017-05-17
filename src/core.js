const { standard_env } = require('./env')
const { Atom } = require('./atom')
const {
  log, newline, is_list_type
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

const eval = (x, enviroment = standard_env) => {
  const leftmost = x[0]

  if (is_symbol(x)) {
    return enviroment[x]
  } else if (!is_list(x)) {
    return x
  } else if (leftmost === 'if') {
    not_implemented('if')
  } else if (leftmost === 'define') {
    not_implemented('define')
  } else {
    not_implemented('proceedure call')
  }
}

const repl = env => {
  process.stdin.setEncoding('utf8') // do we need this?

  let val
  while (true) {
    log('>> ')
    val = eval(parse(process.stdin.read()), env)
    newline()
    log(val)
  }
}


module.exports = {
  parse
}