const { parse, execute, repl } = require('./src/core')
const { logln } = require('./src/util')
/*
TODO: Command line args, file reading
*/

const main = program => {
  let result
  try {
    result = execute(program)
    logln(`result: ${result}`)
  } catch (e) {
    console.error(e)
  }
}

main(process.argv[2])
