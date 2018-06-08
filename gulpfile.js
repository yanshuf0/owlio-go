const gulp = require("gulp"),
  util = require("gulp-util"),
  notifier = require("node-notifier"),
  sync = require("gulp-sync")(gulp).sync,
  reload = require("gulp-livereload"),
  child = require("child_process"),
  os = require("os"),
  run = require("gulp-run");

var server = null;

// Compile application
gulp.task("server:build", function() {
  // Build application in the "gobin" folder
  process.chdir(__dirname);
  var build = child.spawnSync("go", ["build"]);

  if (build.stderr.length) {
    util.log(util.colors.red("Something wrong with this version :"));
    var lines = build.stderr
      .toString()
      .split("\n")
      .filter(function(line) {
        return line.length;
      });
    for (var l in lines)
      util.log(util.colors.red("Error (go build): " + lines[l]));
    notifier.notify({
      title: "Error (go build)",
      message: lines
    });
  }

  return build;
});

// Server launch
gulp.task("server:spawn", function() {
  // Stop the server
  if (server && server !== "null") {
    server.kill();
  }

  // Application name
  if (os.platform() == "win32") {
    // Windows
    var path_folder = __dirname.split("\\");
  } else {
    // Linux / MacOS
    var path_folder = __dirname.split("/");
  }
  var length = path_folder.length;
  var app = path_folder[length - parseInt(1)];

  process.chdir(__dirname);

  // Run the server
  if (os.platform() == "win32") {
    server = child.spawn(app + ".exe");
  } else {
    server = child.spawn("./" + app);
  }

  // Display terminal informations
  server.stderr.on("data", function(data) {
    process.stdout.write(data.toString());
  });
});

// Watch files
gulp.task("server:watch", function() {
  process.chdir(__dirname);
  gulp.watch(
    ["*.go", "**/*.go"],
    sync(["server:build", "server:spawn"], "server")
  );
});

gulp.task("client:build", function() {
  process.chdir(__dirname);
  process.chdir("./web/owlio-spa");
  return run("npm run build").exec();
});

// Watch files
gulp.task("client:watch", function() {
  process.chdir(__dirname);
  gulp.watch(
    [
      "./web/owlio-spa/src/*.js",
      "./web/owlio-spa/src/**/*.js",
      "./web/owlio-spa/src/*.css",
      "./web/owlio-spa/src/**/*.css"
    ],
    sync(["client:build"], "client")
  );
});

gulp.task("default", [
  "server:build",
  "client:build",
  "server:spawn",
  "server:watch",
  "client:watch"
]);
