// const { PrismaClient } = require('@prisma/client')
// const prisma = new PrismaClient()
const express = require('express')

const router = express.Router()

router.route('/').get(async (req, res) => {
  res.json({ message: 'Hello from serverd!' })
})

router.use('/cypher', require('./pages/BaoMat/api'))

module.exports = router