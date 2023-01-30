import path from 'path';
import TerserPlugin from 'terser-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import nodeExternals from 'webpack-node-externals';

const { NODE_ENV = 'production' } = process.env;

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/index.ts',
  mode: NODE_ENV,
  target: 'node',
  module: { rules: [{ test: /\.ts$/, use: ['ts-loader'] }] },
  output: { path: path.resolve(__dirname, 'dist'), filename: 'index.js' },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  externals: [nodeExternals()],
  optimization: { minimize: true, minimizer: [new TerserPlugin()] },
};