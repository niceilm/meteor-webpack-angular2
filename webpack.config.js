var weight = 100;

function dependencies() {
  return {
    dependencies: {},
    devDependencies: {
      "angular2-load-children-loader": "^0.1.3",
      "angular2-template-loader": "^0.4.0",
      "awesome-typescript-loader": "^2.2.4",
      "css-loader": "^0.23.1",
      "es6-promise-loader": "^1.0.2",
      "extract-text-webpack-plugin": "^1.0.1",
      "file-loader": "^0.8.5",
      "html-loader": "^0.4.3",
      "html-webpack-plugin": "^2.15.0",
      "jasmine-core": "^2.4.1",
      "json-loader": "^0.5.4",
      "karma": "^1.2.0",
      "karma-jasmine": "^1.0.2",
      "karma-phantomjs-launcher": "^1.0.2",
      "karma-sourcemap-loader": "^0.3.7",
      "karma-webpack": "^1.8.0",
      "null-loader": "^0.1.1",
      "phantomjs-prebuilt": "^2.1.7",
      "raw-loader": "^0.5.1",
      "rimraf": "^2.5.2",
      "style-loader": "^0.13.1",
      "ts-loader": "^0.8.1",
      "typescript": "^2.0.2",
      "typings": "^1.3.2",
      "url-loader": "^0.5.7",
      "webpack": "^1.13.0",
      "webpack-dev-server": "^1.14.1",
      "webpack-hot-middleware": "^2.10.0",
      "webpack-merge": "^0.14.0"
    }
  };
}

function config(settings, require) {
  var fs = require('fs');
  var path = require('path');
  var CWD = path.resolve('./');
  settings.angular2 = settings.angular2 || {};
  var webpack = require('webpack');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var targetPath = path.join(CWD, settings.angular2.targetPath || 'src/app');

  var developmentConfig = {
    plugins: [
      new ExtractTextPlugin('[name].css')
    ]
  };
  var productionConfig = {
    config: {
      htmlLoader: {
        minimize: false // workaround for ng2
      },
    },
    plugins: [
      new webpack.NoErrorsPlugin(),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
        mangle: {
          keep_fnames: true
        }
      }),
      new ExtractTextPlugin('[name].[hash].css'),
      new webpack.DefinePlugin({
        'process.env': {
          'ENV': JSON.stringify(process.env)
        }
      })
    ]
  };

  return {
    extensions: ['', '.js', '.ts'],
    config: settings.isDebug ? {} : productionConfig.config,
    loaders: [
      {test: /^es6-promise!/, loader: 'promise'},
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader', 'angular2-load-children-loader'],
        exclude: [/\.(spec|e2e)\.ts$/]
      },
      {test: /\.html$/, loader: 'html'},
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: settings.isTest ? 'null' : 'file?name=assets/[name].[hash].[ext]'
      },
      {test: /\.css$/, exclude: targetPath, loader: settings.isTest ? 'null' : ExtractTextPlugin.extract('style', 'css?sourceMap')},
      {test: /\.css$/, include: targetPath, loader: 'raw'}
    ],
    plugins: [].concat(settings.isDebug ? developmentConfig.plugins : productionConfig.plugins)
  };
}