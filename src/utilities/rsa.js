import { GCD } from "./number"

export function findPsuedoPrime(p, q) {
  return {
    n: p * q,
    psuedoPrime: (p - 1) * (q - 1),
  }
}

export function checkE(psuedoPrime, e) {
  return GCD(e, psuedoPrime) === 1
}

export function findNextE(psuedoPrime, min = 2, revert = false) {
  if (psuedoPrime <= 2) return 2
  let i = min
  if (revert) {
    for (; i > 1; i--) if (checkE(psuedoPrime, i)) return i
    i = 2
  }

  for (; i < psuedoPrime; ++i) if (checkE(psuedoPrime, i)) return i;
  return findNextE(psuedoPrime, psuedoPrime, true)
}

export function checkD(psuedoPrime, e, d) {
  return (d * e - 1) % psuedoPrime === 0
}

export function findNextD(psuedoPrime, e, min = 2, revert = false) {
  let i = min;
  if (revert) {
    for (; i > 1; --i) if (checkD(psuedoPrime, e, i)) return i
    i = 2
  }
  for (; !checkD(psuedoPrime, e, i); ++i);
  return i;
}

export function rsaEncrypt(message, publicKey) {
  const { e, n } = publicKey;

  // Mã hóa từng ký tự trong thông điệp
  return [...message].map(char => {
    let m = char.charCodeAt(0)
    if (m === -1) m = ' '.charCodeAt(0)
    return Math.pow(m, e) % n;
  }).join(' ');
}

export function rsaDecrypt(cipherText, privateKey) {
  const { d, n } = privateKey;
  // Giải mã từng phần tử trong bản mã
  return cipherText.split(' ').map(code => {
    const c = parseInt(code, 10)
    return Math.pow(c, d) % n;
  }).join('');
}

// JavaScript Program for implementation of RSA Algorithm

// Function to compute base^expo mod m using BigInt
function power(base, expo, m) {
  let res = BigInt(1);
  base = BigInt(base) % BigInt(m);
  expo = BigInt(expo)
  while (expo > 0) {
    if (expo & BigInt(1)) res = (res * base) % BigInt(m);

    base = (base * base) % BigInt(m);
    expo = Math.floor(Number(expo) / 2);
    expo = BigInt(expo);
  }
  return res;
}

export function rsaEnscription(message, key, encode) {
  if (encode) return [...message].map(i => power(i.charCodeAt(0), key.e, key.n)).join(' ')
  return message.map(i => String.fromCharCode(parseInt(power(i, key.d, key.n)))).join('')
}
