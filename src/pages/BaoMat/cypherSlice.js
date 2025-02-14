import { useSelector } from "react-redux";
import { getCaesarInput } from "../../redux/selectors";
import { affineCipher, alphabetOptions, caesarCipher, desCipher, lowercaseAlphabet, number, uppercaseAlphabet, vigenereCipher } from "../../utilities/crypto";
import axios from "axios";
import { findNextPrime, isPrime } from "../../utilities/number";
import { findNextD, findNextE, findPsuedoPrime, rsaDecrypt, rsaEncrypt, rsaEnscription } from "../../utilities/rsa";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchDESEnscript = createAsyncThunk(
  'cypher/desEnscript',
  async (input, thunkAPI) => {
    const result = await axios.post('api/cypher/des/enscript', input)
    return result.data
  }
)
export const fetchDESDescript = createAsyncThunk(
  'cypher/desDescript',
  async (input, thunkAPI) => {
    const result = await axios.post('api/cypher/des/descript', input)
    return result.data
  }
)
export const fetchAESEnscript = createAsyncThunk(
  'cypher/aesEnscript',
  async (input, thunkAPI) => {
    input.key = input.key.padEnd(16)
    const result = await axios.post('api/cypher/aes/enscript', input)
    return result.data
  }
)

export const fetchAESDescript = createAsyncThunk(
  'cypher/aesDescript',
  async (input, thunkAPI) => {
    input.key = input.key.padEnd(16)
    const result = await axios.post('api/cypher/aes/descript', input)
    return result.data
  }
)

function ModernCypher(state, action) {
  state.output = action.payload.output
}
function PendingCypher(state, action) {
  state.output = 'pending...'
}
const initialState = {
  cipher: "rsa",
  alphabet: [...alphabetOptions],
  keys: lowercaseAlphabet + uppercaseAlphabet + number,
  input: {
    k: 0,                         // caesar
    a: 0,                         // affine
    b: 0,                         // affine
    matrix: [],                   // hill
    key: '',                      // vigenere, des, aes
    p: 2,                         // rsa
    q: 2,                         // rsa
    e: 2,                         // rsa
    d: 0,                         // rsa
    n: 0,                         // rsa
    psuedoPrime: 0,               // rsa
    message: '',
  },
  output: ''
}
const cypherSlice = createSlice({
  name: "cypher",
  initialState,
  extraReducers(builder) {
    // Des enscript
    builder.addCase(fetchDESEnscript.pending, PendingCypher)
    builder.addCase(fetchDESEnscript.fulfilled, ModernCypher)

    // Des descript
    builder.addCase(fetchDESDescript.pending, PendingCypher)
    builder.addCase(fetchDESDescript.fulfilled, ModernCypher)

    // Aes enscript
    builder.addCase(fetchAESEnscript.pending, PendingCypher)
    builder.addCase(fetchAESEnscript.fulfilled, ModernCypher)

    // Aes descript
    builder.addCase(fetchAESDescript.pending, PendingCypher)
    builder.addCase(fetchAESDescript.fulfilled, ModernCypher)
  },
  reducers: {
    changeCypher(state, action) {
      state.cipher = action.payload
    },
    updateInput(state, action) {
      state.input = { ...state.input, ...action.payload }
    },
    resetInput(state, action) {
      state.input = { ...initialState.input }
    },
    setAlphabet(state, action) {
      if (action.payload.length == 0) return
      state.alphabet = [...action.payload]

      state.keys = ""
      if (state.alphabet.includes('a-z')) state.keys += lowercaseAlphabet
      if (state.alphabet.includes('A-Z')) state.keys += uppercaseAlphabet
      if (state.alphabet.includes('0-9')) state.keys += number
    },
    enscriptClassic(state, action) {
      const payload = action.payload
      switch (state.cipher) {
        case 'caesar':
          state.output = caesarCipher(payload.message, payload.k, state.keys)
          break;
        case 'affine':
          state.output = affineCipher(payload.message, payload.a, payload.b, state.keys)
          break;
        case 'hill':
          state.output = ''
          break;
        case 'vigenere':
          state.output = vigenereCipher(payload.message, payload.key, state.keys)
          break;
      }
    },
    descriptClassic(state, action) {
      const payload = action.payload
      switch (state.cipher) {
        case 'caesar':
          state.output = caesarCipher(payload.message, payload.k, state.keys, false)
          break;
        case 'affine':
          state.output = affineCipher(payload.message, payload.a, payload.b, state.keys, false)
          break;
        case 'hill':
          state.output = ''
          break;
        case 'vigenere':
          state.output = vigenereCipher(payload.message, payload.key, state.keys, false)
          break;
      }
    },
    rsaEncrypt(state) {
      state.output = rsaEnscription(state.input.message, { e: state.input.e, n: state.input.n }, true)
    },
    rsaDecrypt(state) {
      state.output = rsaEnscription(state.input.message.split(' '), { d: state.input.d, n: state.input.n })
    },
    updateRSA(state) {
      const { p, q } = state.input

      const { n, psuedoPrime } = findPsuedoPrime(q, p)
      state.input.psuedoPrime = psuedoPrime
      state.input.n = n

      if (psuedoPrime <= 2) return

      state.input.e = findNextE(psuedoPrime)
      state.input.d = findNextD(psuedoPrime, state.input.e)
    },

  }
})

export default cypherSlice