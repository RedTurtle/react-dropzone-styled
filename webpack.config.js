const path = require('path');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  const isProduction = env === 'production';
  const cssLoaderDevConfig = {
    loader: require.resolve('css-loader'),
    options: {
      importLoaders: 1,
    },
  };
  const cssLoaderProdConfig = Object.assign({}, cssLoaderDevConfig, {
    options: Object.assign({}, cssLoaderDevConfig.options, {
      minimize: true,
      sourceMap: true,
    }),
  });
  const postcssLoaderConfig = {
    loader: require.resolve('postcss-loader'),
    options: {
      ident: 'postcss',
      plugins: () => [
        require('postcss-flexbugs-fixes'),
        autoprefixer({
          browsers: ['>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9'],
          flexbox: 'no-2009',
        }),
      ],
    },
  };

  const cssRules = { test: /\.css$/ };
  const plugins = [];
  if (isProduction) {
    Object.assign(cssRules, {
      loader: ExtractTextPlugin.extract({
        fallback: require.resolve('style-loader'),
        use: [cssLoaderProdConfig, postcssLoaderConfig],
      }),
    });
    plugins.push(new ExtractTextPlugin({ filename: 'styles.css' }));
  } else {
    Object.assign(cssRules, {
      use: [
        require.resolve('style-loader'),
        cssLoaderDevConfig,
        postcssLoaderConfig,
      ],
    });
  }

  return {
    entry: './src/index.js',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
      libraryTarget: 'umd',
      library: 'DropzoneStyled',
    },
    module: {
      rules: [
        {
          include: [path.resolve(__dirname, 'src')],
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        cssRules,
      ],
    },
    plugins: plugins,
    resolve: {
      // Can require('file') instead of require('file.js') etc.
      extensions: ['.js', '.json'],
    },
    externals: {
      react: 'react',
    },
  };
};
