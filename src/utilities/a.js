const fs = require('fs')
const md5 = require('md5')

const p = './example.txt'
const r = './result.txt'
const reuslt = fs.readFileSync(p);
const m = md5(reuslt)



fs.writeFileSync(r, m)



function Cau1(message, a, b, alphabet) {
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
var stdin = process.openStdin();
require('tty').setRawMode(true);

stdin.on('keypress', function (chunk, key) {
  process.stdout.write('Get Chunk: ' + chunk + '\n');
  if (key && key.ctrl && key.name == 'c') process.exit();
});
function Cau2() {

}