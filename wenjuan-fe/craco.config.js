module.exports = {
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    proxy: {
      context: ['/api'],
      target: 'http://localhost:3001',
    },
  },
}
