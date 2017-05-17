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
  '+':  op_add,
  '-':  op_subtract,
  '*':  op_multiply,
  '/':  op_divide,
  '**': op_power,
  '>':  op_gt,
  '<':  op_lt,
  '>=': op_gte,
  '<=': op_lte,

  'apply':      (fn, ...args) => Array.isArray(args[0])
                                  ? fn.apply(null, args)
                                  : fn.call(null, ...args),

  'cons':       (x, y) => [x].concat(y),
  'cdr':        xs => xs.slice(1),
  'car':        xs => [xs[0]],
  'eq?':        (a, b) => a === b,

  'max':        (a, b) => a >= b ? a : b,
  'min':        (a, b) => a <= b ? a : b,

  'length':     x => (x).length || 0,

  'not':        x => !x,

  'list':       x => [x],

  'proceedure?':  is_callable,
  'null?':        is_empty_list,
  'print':        logln,
}

module.exports = { standard_env }