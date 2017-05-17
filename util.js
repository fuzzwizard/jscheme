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

const log = s => process.stdout.write(s)
const newline = log('\n')

const is_symbol = ({ type }) => type === 'Symbol'
const is_number = ({ type }) => type === 'Number'
const is_list   = ({ type }) => type === 'List'

const not_implemented = _ => console.log('Something hasn\'t been done yet!')

module.exports = {
  parse_int, parse_float, log, 
  is_symbol, is_number, is_list, 
  not_implemented
}