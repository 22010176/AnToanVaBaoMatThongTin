import CryptoJS from "crypto-js"
import aesjs from "aes-js"

import md5 from "md5"
import ReverseMd5 from 'reverse-md5'

export const cypherName = [
  { lower: 'caesar', upper: 'CAESAR', cap: 'Caesar' },
  { lower: 'affine', upper: 'AFFINE', cap: 'Affine' },
  // { lower: 'hill', upper: 'HILL', cap: 'Hill' },
  { lower: 'vigenere', upper: 'VIGENERE', cap: 'Vigenere' },
  { lower: 'des', upper: 'DES', cap: 'DES' },
  { lower: 'aes', upper: 'AES', cap: 'AES' },
  { lower: 'rsa', upper: 'RSA', cap: 'RSA' },
  { lower: 'md5', upper: 'MD5', cap: 'MD5' },
]

export const alphabetOptions = ['a-z', 'A-Z', '0-9']
export const lowercaseAlphabet = 'abcdefghijklmnopqrstuvwxyz'
export const uppercaseAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
export const number = '0123456789 \n'

export function caesarCipher(text, k, alphabet = '', encode = true) {
  const len = alphabet.length
  const shift = encode ? k : -k;

  return [...text].map(char => {
    const code = alphabet.indexOf(char);

    if (code === -1) return char
    return alphabet[(code + shift + len) % len];
  }).join('');
}

export function affineCipher(text, a, b, alphabet = '', encode = true) {
  const len = alphabet.length

  // Mã hóa Affine
  if (encode) return [...text].map(char => {
    const code = alphabet.indexOf(char);

    if (code === -1) return char
    return alphabet[(code * a + b) % len];
  }).join('');

  // Giải mã Affine
  return [...text].map(i => {
    if (alphabet.indexOf(i) === -1) return i

    let index = alphabet.indexOf(i) - b
    while (index < 0 || index % a !== 0) index += len;
    return alphabet[Math.floor(index / a)]
  }).join('')
}


export function vigenereCipher(message = '', key = '', alphabet = '', encode = true) {
  const len = alphabet.length
  const keyCharcode = [...key].map(i => {
    const index = alphabet.indexOf(i)
    return index === -1 ? alphabet.length - 1 : index
  })
  if (encode) return [...message].map((i, j) => {
    const charCode = alphabet.indexOf(i)

    if (charCode === -1) return alphabet[alphabet.length - 1]
    return alphabet[(charCode + keyCharcode[j % keyCharcode.length]) % len]
  }).join('')

  return [...message].map((i, j) => {
    const result = alphabet.indexOf(i) - keyCharcode[j % keyCharcode.length]
    return alphabet[(result + len) % len]
  }).join('')
}

export function desCipher(message = '', key = '', encode = true) {
  const _key = CryptoJS.enc.Hex.parse(key)

  if (encode) {
    const encrypted = CryptoJS.DES.encrypt(message, _key, { mode: CryptoJS.mode.ECB })
    return encrypted.ciphertext.toString();
  }

  const cipher = CryptoJS.enc.Hex.parse(message)
  const decrypted = CryptoJS.DES.decrypt({ ciphertext: cipher }, _key, { mode: CryptoJS.mode.ECB })
    .toString(CryptoJS.enc.Utf8);

  return decrypted
}

export function aesCipher(message = '', key = '', encode = true) {
  const _key = [...key].slice(0, 16).map(i => i.charCodeAt(0))
  const aesCtr = new aesjs.ModeOfOperation.ctr(_key, new aesjs.Counter(500));

  if (encode) {
    const messageBytes = aesjs.utils.utf8.toBytes(message)
    const result = aesCtr.encrypt(messageBytes)
    return aesjs.utils.hex.fromBytes(result)
  }

  const messageBytes = aesjs.utils.hex.toBytes(message)
  const result = aesCtr.decrypt(messageBytes)
  return aesjs.utils.utf8.fromBytes(result)
}

const md5Reverse = ReverseMd5({
  lettersUpper: true,
  lettersLower: true,
  numbers: true,
  special: false,
  whitespace: true,
  maxLen: 50
})
export function md5Cipher(message, encode) {
  if (encode) return md5(message)
  console.log({ message }, 'ddd')
  const result = md5Reverse(message)
  console.log(result)

  return result
}


export function md5FileEncrypt(path) {

}


// const a = md5('test')
// const b = ReverseMd5({
//   lettersUpper: true,
//   lettersLower: true,
//   numbers: true,
//   special: false,
//   whitespace: true,
//   maxLen: 1000
// })(a)
// console.log(a, b)