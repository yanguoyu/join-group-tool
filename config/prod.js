module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {
  },
  copy: {
    patterns: [
      { from: 'src/assert/', to: 'dist/assert/' }, // 指定需要 copy 的目录
    ]
  },
  weapp: {},
  h5: {}
}
