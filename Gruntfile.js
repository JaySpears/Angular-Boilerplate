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
					'public/assets/css/styles.css': 'public/assets/css/src/styles.scss'
				}
			}
		},

    // Minifies CSS
    cssmin: {
      minify: {
        expand: true,
        cwd: 'public/assets/css',
        src: ['styles.css'],
        dest: 'public/assets/css',
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
        src: ['public/app/controllers/src/*.js'],
        dest: 'public/app/controllers/controllers.js'
	    },
	    angular_directives: {
        src: ['public/app/directives/src/*.js'],
        dest: 'public/app/directives/directives.js'
	    },
	    angular_filters: {
        src: ['public/app/filters/src/*.js'],
        dest: 'public/app/filters/filters.js'
	    },
	    angular_services: {
        src: ['public/app/services/src/*.js'],
        dest: 'public/app/services/services.js'
	    }
		},

		// Minify JS
		uglify: {
			scripts: {
				src: [],
				dest: 'public/app/scripts.js'
			}
		},

		// Watch command
		watch: {
			styles: {
				files: 'public/assets/css/src/*.scss',
				tasks: 'dist-styles',
				options: {
					livereload: true,
				}
			},
			scripts:{
				files: ['public/app/app.js','public/app/*/*.js', 'public/app/*/src/*.js'],
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
