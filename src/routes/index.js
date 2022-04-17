const express = require('express')

const auth = require('./auth')
const users = require('./users')

const Router = express.Router()

Router.get('/', (req, res) => {
  res.json({
      success: true,
      data: {
        app: 'Aisy Sae Bersaudara Service',
        author: 'Rehan Arroihan'
      },
  })
})

Router.use('/auth', auth)
Router.use('/users', users)

module.exports = Router