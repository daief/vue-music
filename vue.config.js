const webpack = require('webpack');

const isBuild = process.env.NODE_ENV === 'production'

// self project config
const config = {
  // try .env.production.local
  API_SERVER: isBuild ? process.env.API_SERVER : 'http://localhost:3000'
}

module.exports = {
  lintOnSave: false,
  baseUrl: isBuild ? './' : '/',
  configureWebpack: {
    plugins: [
      new webpack.DefinePlugin({
        config: JSON.stringify(config)
      }),
    ]
  }
}
