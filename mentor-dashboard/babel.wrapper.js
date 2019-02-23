module.exports = require('babel-jest').createTransformer({
  presets: ['@babel/preset-env', '@babel/preset-react'],
  plugins: [
    'syntax-dynamic-import',
    'transform-async-to-generator',
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    '@babel/plugin-transform-runtime',
  ],
});
