module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 3000,
          base: '.',
          keepalive: true,
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

  // grunt.registerTask('connect', ['connect']);

};