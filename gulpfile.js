const { watch, series } = require('gulp');
var exec = require('child_process').exec;

function clean(cb){
    exec('rm -v -R build/*', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
    createBuild();
    cb();
}

function createBuild(){
    exec('mkdir build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
}

function compile(cb) {
    // place code for your default task here
    exec('cp -v -f -R public/* build', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
    exec('npx babel src --out-dir build --presets react-app/prod', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
      });
    cb();
}
  
exports.rebuild = series(clean,compile);
exports.development = function() {
    // The task will be executed upon startup
    watch(['src/*','public/*'], { ignoreInitial: false },series(clean,compile));
};
exports.production = series(createBuild,compile);