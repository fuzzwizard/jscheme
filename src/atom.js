const { parse_float } = require('./util')

const TypeDef = type => value => ({
  value, type,
  identity: _ => value, // YAGNI?
  inspect: _ => `${type}( ${type === 'Symbol' ? `:${value}` : value} )`
})

const AtomTypes = {
  Symbol: x => TypeDef('Symbol') (`${x}`),
  Number: x => TypeDef('Int')    (parse_float(x)),
  List:   x => TypeDef('List')   (x), // lol?
}

const Atom = token => {
  if (token === null) {
    return AtomTypes.List([])
  }
  if (isNaN(token)) {
    if (typeof token === 'string') {
      return AtomTypes.Symbol(token)
    } else if (Array.isArray(token)) {
      return AtomTypes.List(token)
    }
    throw new Error('Objects are not supported in jscheme. Sorry!')
  } else {
    return AtomTypes.Number(token)
  }
}

module.exports = { Atom }
