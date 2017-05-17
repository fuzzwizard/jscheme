const { standard_env } = require('./env')
const { Atom } = require('./atom')
const {
  log, newline, is_symbol, is_number, is_list, not_implemented
} = require('./util')

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
  if (is_symbol(x)) {
    return enviroment[x]
  } else if (!is_list(x)) {
    return x
  } else if (x[0] === 'if') {
    not_implemented()
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

const main = program => {
  let result
  try {
    result = parse(program)
    console.log(result)
  } catch (e) {
    console.error(e)
    return 1
  }
  return 0
}

/*
TODO: Command line args, file reading
*/

console.log(JSON.stringify(parse(process.argv[2]), null, ' '))

