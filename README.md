# webpack-angular2

```
meteor add webpack:webpack
meteor add flynn:webpack-angular2
```

# Config
webpack.json
```
{
  "root": "src",
  "devServer": {
    "host": "localhost"
  },
  "angular2": {
    "targetPath": "src/app"
  }
}
```
## angular2.targetPath
* default value "src/app"
* target path for Angular2 Component
because styleUrls to styles by css bundling


# Link
## angular2
https://github.com/angular/angular

## webpack
https://github.com/webpack/webpack

## meteor webpack
https://github.com/thereactivestack/meteor-webpack

## module lazy loading
https://github.com/gdi2290/es6-promise-loader
https://github.com/Quramy/angular2-load-children-loader
https://github.com/Quramy/ng2-lazy-load-demo
