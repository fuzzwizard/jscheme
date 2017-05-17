const parse_int = num => {
  const result = parseInt(num, 10)
  if (isNaN(result)) {
    console.warn('Tried to cast an illegal value to an int.')
    return -Infinity
  }
  return result
}

const parse_float = num => {
  const result = parseFloat(num, 10)
  if (isNaN(result)) {
    console.warn('Tried to cast an illegal value to a float.')
    return -Infinity
  }
  return result
}

// const is_number = num => !isNaN(num)

const log      = s => process.stdout.write(s)
const newline  = _ => log('\n')
const logln    = (...s) => console.log(...s)
const readln   = s => process.stdin.read(s)

const is_symbol_type = ({ type }) => type === 'Symbol'
const is_number_type = ({ type }) => type === 'Number'
// I know lists aren't atoms. Just let me live.
const is_list_type   = ({ type }) => type === 'List'

module.exports = {
  parse_int, parse_float, log, logln,
  is_symbol_type, is_number_type, is_list_type
}