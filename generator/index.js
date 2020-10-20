const fs = require('fs')

module.exports = (api) => {
  const utils = require('./utils')(api)

  api.extendPackage({
    dependencies: {
      paketvy: '^0.0.2',
      'vue-router': '^3.1.5',
    },
  })

  // 删除 vue-cli3 默认的 /src 目录
  api.render((files) => {
    Object.keys(files)
      .filter((path) => path.startsWith('src/'))
      .forEach((path) => delete files[path])
  })

  api.render('./template')

  api.onCreateComplete(() => {
    const entryCopyData = fs.readFileSync(api.resolve('./main.template'), {
      encoding: 'utf-8',
    })
    fs.writeFileSync(api.resolve('./src/main.js'), entryCopyData, {
      encoding: 'utf-8',
    })
    utils.deleteFile('./main.template')
  })
}
