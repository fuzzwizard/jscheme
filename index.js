const { parse } = require('./src/core')

/*
TODO: Command line args, file reading
*/

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

main(process.argv[2])
