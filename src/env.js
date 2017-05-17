const math_func = (reducer, init) => (...xs) => xs.reduce(reducer, init)

const op_add      = math_func((acc, x) => acc + x, 0)
const op_subtract = math_func((acc, x) => acc - x, 0)
const op_multiply = math_func((acc, x) => acc * x, 0)
const op_divide   = math_func((acc, x) => acc / x)

const standard_env = _ => ({
  '+': op_add, '-': op_subtract, '*': op_multiply, '/': op_divide
})

module.exports = {
  standard_env
}