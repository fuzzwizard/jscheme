const { parse_float } = require('./util')

const Atom = token => {
  if (token === null) {
    return []
  }

  const number = parseFloat(token)

  if (!isNaN(number)) {
    return number
  } else {
    return token
  }
}

module.exports = { Atom }
