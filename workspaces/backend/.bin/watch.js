const webpack = require('webpack');
var nodemon = require('nodemon');
const path = require('path')
const config = require('../webpack.config')

const compiler = webpack(config);

let isWatching = false;

const watch = () => {
  if (isWatching) {
    return
  }
  isWatching = true;
  nodemon({
    script: path.resolve(__dirname, '../dist'),
    ext: 'js json'
  });

  nodemon.on('start', function () {
    console.log('App has started');
  }).on('quit', function () {
    console.log('App has quit');
    process.exit();
  }).on('restart', function (files) {
    console.log('App restarted due to: ', files);
  });
}

const watching = compiler.watch({
  aggregateTimeout: 300,
  poll: undefined
}, (err, stats) => {
  if (err || stats.hasErrors()) {
    const info = stats.toJson();
    info.errors.map((error => {
      console.error(error.message)
    }))
    return
  }
  watch()
});