export function isPrime(num) {
  for (let i = 2, s = Math.sqrt(num); i <= s; i++) {
    if (num % i === 0) return false;
  }
  return num > 1;
}

export function findNextPrime(min, revert) {
  const step = revert ? -1 : 1
  if (revert && min <= 2) return 2

  let temp = min;
  while (!isPrime(temp)) temp += step
  return temp
}

export function GCD(a, b) {
  if (!b) return a;
  return GCD(b, a % b);
}

export function LCD(a, b) {
  return (a * b) / GCD(a, b);
}

export function modInverse(a, m) {
  let m0 = m;
  let y = 0;
  let x = 1;

  if (m == 1)
    return 0;

  while (a > 1) {

    // q is quotient
    let q = parseInt(a / m);
    let t = m;

    // m is remainder now,
    // process same as
    // Euclid's algo
    m = a % m;
    a = t;
    t = y;

    // Update y and x
    y = x - q * y;
    x = t;
  }

  // Make x positive
  if (x < 0)
    x += m0;

  return x;
}