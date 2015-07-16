module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Converts SASS to CSS
		sass: {
			dist: {
				options: {
					style: 'expanded',
					noCache: true
				},
				files: {
					'app/assets/css/styles.css': 'app/assets/css/src/styles.scss'
				}
			}
		},

    // Minifies CSS
    cssmin: {
      minify: {
        expand: true,
        cwd: 'app/assets/css',
        src: ['styles.css'],
        dest: 'app/assets/css',
        ext: '.min.css'
      }
    },

		// HTTP Server
		connect: {
			server: {
				options: {
					port: 9999,
					hostname: 'localhost',
					open: true
				}
			}
		},

		//Compiles controllers, directives, filters, and services into each of their own compiled file.
		concat: {
			angular_controllers: {
        src: ['app/controllers/src/*.js'],
        dest: 'app/controllers/controllers.js'
	    },
	    angular_directives: {
        src: ['app/directives/src/*.js'],
        dest: 'app/directives/directives.js'
	    },
	    angular_filters: {
        src: ['app/filters/src/*.js'],
        dest: 'app/filters/filters.js'
	    },
	    angular_services: {
        src: ['app/services/src/*.js'],
        dest: 'app/services/services.js'
	    }
		},

		// Minify JS
		uglify: {
			scripts: {
				src: [],
				dest: 'app/scripts.js'
			}
		},

		// Watch command
		watch: {
			styles: {
				files: 'app/assets/css/src/*.scss',
				tasks: 'dist-styles',
				options: {
					livereload: true,
				}
			},
			scripts:{
				files: ['app/app.js','app/*/*.js', 'app/*/src/*.js'],
				tasks: 'dist-scripts'
			}
    }
	});

	// Loads grunt dependencies
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	// Scripts distribution task
	grunt.registerTask('dist-scripts', ['uglify:scripts', 'concat']);

	// Styles distribution task
	grunt.registerTask('dist-styles', ['sass', 'cssmin']);

	// Full distribution task
	grunt.registerTask('dist', ['dist-styles', 'dist-scripts']);

	// Default grunt task
	grunt.registerTask('default', ['dist', 'connect', 'watch']);

};
