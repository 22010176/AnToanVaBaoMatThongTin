const express = require('express')
const { desCipher, aesCipher } = require('../../../utilities/crypto')

const router = express.Router()

router.use(function (req, res, next) {
  console.log(req.body)
  next()
})

router.post('/des/enscript', function (req, res) {
  const data = req.body
  res.json({ output: desCipher(data.message, data.key) })
})

router.post('/des/descript', function (req, res) {
  const data = req.body
  res.json({ output: desCipher(data.message, data.key, false) })
})

router.post('/aes/enscript', function (req, res) {
  const data = req.body
  res.json({ output: aesCipher(data.message, data.key) })
})

router.post('/aes/descript', function (req, res) {
  const data = req.body
  res.json({ output: aesCipher(data.message, data.key, false) })
})

module.exports = router