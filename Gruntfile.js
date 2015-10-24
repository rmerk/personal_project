/**
 * Created by m3rkz0r on 9/28/15.
 */
/**
 * Created by m3rkz0r on 9/26/15.
 */
module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //uglify: {
        //    options: {
        //        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        //    },
        //    build: {
        //        src: './public/javascripts/client.js',
        //        dest: './public/javascripts/client.min.js'
        //    }
        //},
        copy: {
            main: {
                expand: true,
                cwd: "node_modules/",
                src: [
                    "angular/angular.min.js",
                    "angular-material/angular-material.min.js",
                    "angular-material/angular-material.min.css",
                    "angular-animate/angular-animate.min.js",
                    "angular-animate/angular-animate.min.js.map",
                    "angular-route/angular-route.js",
                    "angular-route/angular-route.min.js.map",
                    "angular-aria/angular-aria.min.js",
                    "angular-aria/angular-aria.min.js.map",
                    "font-awesome/css/font-awesome.min.css",
                    "font-awesome/fonts/fontawesome-webfont.tff",
                    "font-awesome/fonts/fontawesome-webfont.woff2",
                    "jquery/dist/jquery.min.js"


                ],
                "dest": "./public/vendor/"
            }
        },
        sass: {
            dist: {
                files: {
                    './public/stylesheets/style.css' : './sass/style.scss'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Default task(s).
    grunt.registerTask('default', ['copy', 'sass']);

};
