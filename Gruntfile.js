
var path = require('path');

module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    handlebars: {
      compile: {
        options: {
          namespace: "Templates",
          processName: function(filename) {
            return path.basename(filename,'.hbs');
          }
        },
        files: {
          "public/js/dist/hbs-partials.js": "views/partials/*.hbs",
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  // Default task(s).
  grunt.registerTask('default', ['handlebars']);
};

