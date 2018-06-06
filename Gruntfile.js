/*jshint esversion: 6 */
/*jshint strict:false */
/*jslint node: true */
// Gruntfile.js
module.exports = function(grunt) {

  grunt.initConfig({

      // JS TASKS ================================================================
      // check all js files for errors
      jshint: {
          all: ['public/javascripts/*.js']
      },

      // take all the js files and minify them into app.min.js
      uglify: {
          build: {
              files: {
                  'public/dist/js/app.min.js': ['public/javascripts/*.js']
              }
          }
      },

      // CSS TASKS ===============================================================
      // process the sass file to style.css
      sass: {
          dist: {
              src: 'public/stylesheets/style.sass',
              dest: 'public/dist/css/style.css'
          }
      },

      // take the processed style.css file and minify
      cssmin: {
          build: {
              files: {
                  'public/dist/css/style.min.css': 'public/dist/css/style.css'
              }
          }
      },

      // COOL TASKS ==============================================================
      // watch css and js files and process the above tasks
      watch: {
          css: {
              files: ['public/stylesheets/*.sass'],
              tasks: ['sass', 'cssmin']
          },
          js: {
              files: ['public/javascripts/*.js'],
              tasks: ['jshint', 'uglify']
          }
      },

      // watch our node server for changes
      nodemon: {
          dev: {
              script: 'app.js'
          }
      },

      // run watch and nodemon at the same time
      concurrent: {
          options: {
              logConcurrentOutput: true
          },
          tasks: ['nodemon', 'watch']
      }

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-node-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('default', ['sass', 'cssmin', 'jshint', 'uglify', 'concurrent']);


};