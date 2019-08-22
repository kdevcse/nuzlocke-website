const { watch, series } = require('gulp');
var exec = require('child_process').exec;

function clean(cb){
    exec('rm -v -R build/*', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
    cb();
}

function createBuild(cb){
    exec('mkdir build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
    cb();
}

function compile(cb) {
    // place code for your default task here
    exec('npx babel src --out-dir src --presets react-app/prod', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
    exec('cp -v -f -R src build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
    cb();
}

exports.rebuild = series(clean,createBuild,compile);
exports.development = function() {
    // The task will be executed upon startup
    watch(['src/*'], { ignoreInitial: false },series(clean,createBuild,compile));
};
exports.production = series(createBuild,compile);