const path = require('path')
const fs = require('fs-extra')
const request = require('superagent')

process.on('message', (m) => {
  const downloadUrl = m.url
  const saveDir = m.saveDir
  request.head(downloadUrl)
    .then(res => {
      process.send(res)
    })
})