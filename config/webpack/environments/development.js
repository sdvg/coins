module.exports = _path => ({
  context: _path,
  debug: true,
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: './dist',
    info: true,
    hot: false,
    inline: true,
    historyApiFallback: true
  }
});
