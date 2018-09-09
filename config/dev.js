module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
  },
  copy: {
    patterns: [
      { from: 'src/assert/', to: 'dist/assert/' }, // 指定需要 copy 的目录
      { from: 'src/shared/av-weapp-min.js', to: 'dist/shared/av-weapp-min.js' } // 指定需要 copy 的文件
    ]
  },
  weapp: {
    compile: {
      exclude: ['src/shared/av-weapp-min.js']
    }
  },
  h5: {}
}
