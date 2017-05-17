const { logln } = require('./util')

const op_add      = (a, b) => a + b
const op_subtract = (a, b) => a - b
const op_multiply = (a, b) => a * b
const op_divide   = (a, b) => a / b
const op_power    = (a, b = 2) => {
  while (b > 1) { a *= a; --b }
  return a
}

const op_gt  = (a, b) =>  a > b
const op_lt  = (a, b) =>  a < b
const op_gte = (a, b) => a >= b
const op_lte = (a, b) => a <= b

const is_callable    = fn => typeof fn === 'function'
const is_empty_list  = list => list.length === 0

const standard_env = {
  '+': op_add, '-': op_subtract, '*': op_multiply, '/': op_divide, '**': op_power,
  '>': op_gt, '<': op_lt, '>=': op_gte, '<=': op_lte,
  'cons':       xs => xs.slice(1),
  'car':        xs => [xs[0]],
  'equal?':     (a, b) => a === b,
  'callable?':  is_callable,
  'null?':      is_empty_list,
  'print':      logln, 
}

module.exports = { standard_env }