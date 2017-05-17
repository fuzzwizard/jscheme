const { parse } = require('./src/core')

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

main(process.argv[2])
