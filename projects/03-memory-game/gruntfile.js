// define your workflow
var workflow = "SASS";

switch (workflow) {
    case "XY":


    // -------
        break;
    // -------
    case "SASS":
		module.exports = function (grunt) {
		    grunt.initConfig({
		        watch: {
		            files: 'scss/*.scss',
		            tasks: ['sass']
		        },
		        sass: {
		            dev: {
		                files: {
		                    'css/app.css': 'scss/app.scss'
		                },
		                options: {
		                	// Output style can be: nested, compact, compressed, expanded.
        					style: 'compressed'
        				}
		            }
		        }
		    });
		    grunt.loadNpmTasks('grunt-contrib-watch');
		    grunt.loadNpmTasks('grunt-contrib-sass');
			grunt.registerTask('default', ['sass']);
		};
    // -------
        break;
    // -------
} // END switch (workflow)
