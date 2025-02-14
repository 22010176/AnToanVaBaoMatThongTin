const { PrismaClient } = require('@prisma/client')
const express = require('express')

const router = express.Router()

const prisma = new PrismaClient()

router.route('/').get(async (req, res) => {
  res.json({ message: 'Hello from serverd!' })
})

router.use('/cypher', require('./pages/BaoMat/api'))

module.exports = router