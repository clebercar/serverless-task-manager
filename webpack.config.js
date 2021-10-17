/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const slsw = require('serverless-webpack')
const ESLintPlugin = require('eslint-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  optimization: {
    minimize: false,
  },
  // Ser for local use um método de build mais rápido,
  // senão use o build de produção
  devtool: slsw.lib.webpack.isLocal
    ? 'eval-cheap-module-source-map'
    : 'source-map',
  resolve: {
    // Extensões que irão ser resolvidas pelo webpack
    extensions: ['.ts', '.js'],
    // Disabilita o recurso para lidar com link simbólicos
    symlinks: false,
    // Disabilita cache
    cacheWithContext: false,
    // Mapeamento dos alias feitos no tsconfig
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@handles': path.resolve(__dirname, './src/handles'),
    },
  },
  output: {
    path: path.join(__dirname, '.build'),
    filename: '[name].js',
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [[path.resolve(__dirname, '.build')]],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
        },
      },
    ],
  },
  plugins: [
    // Checagem do typescript, no webpack 4 também
    // suportava configurar o ESLint a partir dela
    new ForkTsCheckerWebpackPlugin(),
    // Checagem de erros do ESLint
    new ESLintPlugin({
      extensions: ['ts'],
    }),
  ],
}
