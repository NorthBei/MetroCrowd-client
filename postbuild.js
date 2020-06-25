const path = require('path')
const fs = require('fs')

// delete serviceWorker.js after run 'npm run build' to build production
const serviceWorkerJs = path.resolve(__dirname, './dist/service-worker.js')
try {
  fs.unlinkSync(serviceWorkerJs)
  console.log('Successfully deleted the service-worker.js')
} catch (err) {
  console.error(err)
}
