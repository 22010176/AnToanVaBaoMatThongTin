const https = require('https')
const fs = require('fs')
const express = require('express')

const app = express()
const port = process.env.PORT

const credentials = {
  key: fs.readFileSync(process.env.PRIVATE_KEY_PATH),
  cert: fs.readFileSync(process.env.CERTIFICATE_PATH),
}

app.use(express.static('public'))
app.use(require('cors')())
app.use(require('morgan')('combined'))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))
app.use(express.json())

app.use('/api', require('./src/api.js'))

app.get('*', async (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

https.createServer(credentials, app).listen(port, () => {
  console.log(`url: https://localhost${(+port === 443 ? '' : ':' + port)}`)
})

