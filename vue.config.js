module.exports = {
  devServer: {
    host: '0.0.0.0',
    proxy: {
      '/mass': {
        target: 'http://3.12.13.227:4869',
        changeOrigin: true,
        pathRewrite: {
          '^/mass': '',
        },
      },
      '/fconv': {
        target: 'http://3.12.13.227:4870',
        changeOrigin: true,
        pathRewrite: {
          '^/fconv': '',
        },
      },
    },
  },
};
