process.env.NODE_ENV = 'local'
const { handler } = require('../index.js')
handler({})
  .then((response) =>
    console.log('LOCAL res:', JSON.stringify(response, null, 2)),
  )
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
