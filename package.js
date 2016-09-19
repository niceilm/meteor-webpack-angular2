Package.describe({
  name: 'flynn:webpack-angular2',
  version: '0.0.1',
  summary: 'Integrate Angular2 with Webpack',
  git: 'git@github.com:niceilm/meteor-webpack-angular2.git',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.use([
    'webpack:core-config@1.0.1'
  ]);

  api.add_files(['webpack.config.js']);
});
