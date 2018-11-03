module.exports = {
  env: {
    NODE_ENV: '"development"'
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
