// __________________________________________________________________________________________________
// Cypher____________________________________________________________________________________________
// __________________________________________________________________________________________________
export function getCypher(state) {
  return state.cypher
}

export function getCypherName(state) {
  return getCypher(state).cipher
}

export function getCypherAlphabet(state) {
  return getCypher(state).alphabet
}

export function getCypherOutput(state) {
  return getCypher(state).output
}

export function getMessageInput(state) {
  return getCypher(state).input.message
}

export function getCaesarInput(state) {
  const cypherInput = getCypher(state).input

  return JSON.stringify({
    message: cypherInput.message,
    k: cypherInput.k
  })
}

export function getAffineInput(state) {
  const cyp = getCypher(state).input

  return JSON.stringify({
    a: cyp.a,
    b: cyp.b,
    message: cyp.message
  })
}

export function getHillInput(state) {
  const cyp = getCypher(state).input

  return JSON.stringify({
    matrix: cyp.matrix,
    message: cyp.message
  })
}

export function getKeyInput(state) {
  const cyp = getCypher(state).input

  return JSON.stringify({
    key: cyp.key,
    message: cyp.message
  })
}

export const getVigenereInput = getKeyInput
export const getDESInput = getKeyInput
export const getAESInput = getKeyInput

export function getRSAInput(state) {
  const cyp = getCypher(state).input

  return JSON.stringify({
    p: cyp.p,
    q: cyp.q,
    e: cyp.e,
    d: cyp.d,
    psuedoPrime: cyp.psuedoPrime,
    n: cyp.n,
    message: cyp.message
  })
}

export function getCipherInput(state) {
  const cypherName = getCypherName(state)

  switch (cypherName) {
    case 'caesar': return getCaesarInput(state)
    case 'affine': return getAffineInput(state)
    case 'vigenere': return getVigenereInput(state)
    case 'des': return getDESInput(state)
    case 'aes': return getAESInput(state)
    case 'rsa': return getRSAInput(state)
    default: return {}
  }
}

// __________________________________________________________________________________________________
// Note______________________________________________________________________________________________
// __________________________________________________________________________________________________
export function getNote(state) {
  return state.note.value
}