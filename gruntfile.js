/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: '<json:package.json>',

    compass: {
      dev: {
        options: {
          sassDir: 'sass',
          cssDir: 'stylesheets',
          fontsDir: 'fonts',
          imagesDir: 'images'
        }
      },
      prod: {
        options: {
          sassDir: 'sass',
          cssDir: 'stylesheets',
          fontsDir: 'fonts',
          outputStyle: 'compressed'
        }
      },
      tumblr: {
        options: {
          sassDir: 'sass',
          specify: 'sass/tumblr.scss',
          cssDir: 'stylesheets',
          fontsDir: 'fonts',
          imagesDir: 'images'
        }
      },
    },

    watch: {
        scripts: {
            files: [ 'js/*.js' ],
            options: {
              livereload: true
            }
        },
        html: {
            files:['*.html', 'stylesheets/*.css'],
            options: {
                livereload: true
            }
        },
        compass: {
            files:['sass/*.scss', 'sass/*/*.scss'],
            tasks: [ 'compass:dev' ]
        }
        // tumblr: {
        //     files:['sass/*.scss', 'sass/*/*.scss'],
        //     tasks: [ 'compass:tumblr', 'shell:tumblr' ]
        // }
    },

    useminPrepare: {
      html: [ 'dist/index.html', 'dist/page.html' ],
      options: {
        uglify: 'uglify'
      }
    },

    usemin: {
      html: [ 'dist/index.html', 'dist/page.html' ],
      options: {
        basedir: 'dist'
      }
    },

    clean: {
      main: [ 'dist' ],
      // cleanup task for copied files
      complete: [ 'dist/components', 'dist/js/carousel.js' ]
    },

    copy: {
      main: {
        files: [
          {
            expand: true,
            src: [ '*.html' ],
            dest: 'dist/',
            filter: 'isFile'
          },
          {
            src: [ 'js/*.js', 'images/**', 'fonts/**', 'stylesheets/**', 'components/**', '.htaccess' ],
            dest: 'dist/'
          }
        ]
      }
    },

    shell: {
      tumblr: {
        command: 'scp -P 2222 -r stylesheets "laserjn@50.87.144.35:/home3/laserjn/www/sites/friendly/dist"'
      }
    }

  });

  // Default task.
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('produce', [
    'clean',
    'compass:prod',
    'copy',
    'useminPrepare',
    'concat',
    'uglify',
    'usemin',
    'clean:complete'
  ]);

  // dependencies
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};
