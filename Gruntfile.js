/* global module, require */

// constants
var PATHS = {
    SRC: './src/',
    DEST: './dist/',
    TEST: './test/',
    ASSETS: 'assets/',
    CSS: 'assets/css/',
    IMG: 'assets/img/',
    ROOT: 'assets/root/',
    FONTS: 'assets/fonts/',
    JS: 'assets/js/',
    SASS: 'assets/sass/',
    ASSEMBLE: 'templates/',
    CONTENT: 'content/',
    SHORTCUTS: 'redirect-shortcuts/'
};

var PORT = 4000;

module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        /* assemble static site templating */
        assemble: {
            options: {
                data: PATHS.SRC + PATHS.CONTENT + 'data/**/*.json',
                helpers: PATHS.SRC + PATHS.ASSEMBLE + 'helpers/**/*.js',
                layout: 'page.hbs',
                layoutdir: PATHS.SRC + PATHS.ASSEMBLE +  'layouts/',
                partials: PATHS.SRC + PATHS.ASSEMBLE + 'partials/**/*.hbs'
            },
            posts: {
                options: {
                    collections: [{
                        name: 'post',
                        sortby: 'posted',
                        sortorder: 'descending'
                    }]
                },
                files: [{
                    cwd: PATHS.SRC + PATHS.CONTENT,
                    dest: PATHS.DEST,
                    expand: true,
                    src: ['**/*.hbs']
                }]
            }
        },

        /* automatically add prefixes to css */
        autoprefixer: {
            options: {
                browsers: ['last 2 version', '> 1%', 'ff esr', 'ie >= 8', 'ios >= 5', 'android >= 2.3'],
                map: true
            },
            site: {
                files: [{
                    cwd: PATHS.SRC + PATHS.CSS,
                    dest: PATHS.DEST + PATHS.CSS,
                    expand: true,
                    ext: '.css',
                    src: '**/*.css'
                }]
            },
            content: {
                files: [{
                    cwd: PATHS.SRC + PATHS.CONTENT,
                    dest: PATHS.DEST + PATHS.CONTENT,
                    expand: true,
                    ext: '.css',
                    src: '**/*.css'
                }]
            }
        },

        /* remove files from folder */
        clean: {
            dist: [PATHS.SRC + PATHS.CSS, PATHS.DEST],
            useminTidy: [PATHS.DEST + PATHS.JS + '*', '!' + PATHS.DEST + PATHS.JS + '**/*.min{,.*}.js', '!' + PATHS.DEST + PATHS.JS + 'vendors/*.js']
        },

        /* combine media queries */
        cmq: {
            site: {
                files: [{
                    cwd: PATHS.SRC + PATHS.CSS,
                    dest: PATHS.DEST + PATHS.CSS,
                    expand: true,
                    ext: '.css',
                    src: '**/*.css'
                }]
            }
        },

        compress: {
            main: {
                options: {
                    level: 9,
                    mode: 'gzip'
                },
                files: [{
                    expand: true,
                    cwd: PATHS.DEST,
                    src: [PATHS.CSS + '{,*/}*', PATHS.IMG + '{,*/}*', PATHS.JS + '{,*/}*'],
                    dest: PATHS.DEST
                }]
            }
        },

        /* create a local server */
        connect: {
            options: {
                port: PORT,
                base: PATHS.DEST
            },
            dev: {
            },
            content: {
                options: {
                    open: true
                }
            }
        },

        /* copy files */
        copy: {
            content: {
                files: [{
                    cwd: PATHS.SRC + PATHS.CONTENT,
                    dest: PATHS.DEST,
                    expand: true,
                    src: '**/*.{css,js}'
                }]
            },
            scripts: {
                files: [{
                    cwd: PATHS.SRC + PATHS.JS,
                    dest: PATHS.DEST + PATHS.JS,
                    expand: true,
                    src: ['**/*.js', '!vendors/modernizr.js']
                }]
            },
            vendorScripts: {
                files: [{
                    cwd: PATHS.SRC + PATHS.JS,
                    dest: PATHS.DEST + PATHS.JS,
                    expand: true,
                    src: ['vendors/*.js', '!vendors/modernizr.js']
                }]
            },
            fonts: {
                files: [{
                    cwd: PATHS.SRC + PATHS.FONTS,
                    dest: PATHS.DEST + PATHS.FONTS,
                    expand: true,
                    src: '**/*.*'
                }]
            },
            root: {
                files: [{
                    cwd: PATHS.SRC + PATHS.ROOT,
                    dest: PATHS.DEST,
                    expand: true,
                    src: '**/*.*'
                }]
            },
			redirectShortcuts: {
                files: [{
                    cwd: PATHS.SRC + PATHS.SHORTCUTS,
                    dest: PATHS.DEST,
                    expand: true,
                    src: '**/*.*'
                }]
            },
            image: {
                files: [{
                    cwd: PATHS.SRC + PATHS.IMG,
                    dest: PATHS.DEST + PATHS.IMG,
                    expand: true,
                    src: '**/*.{gif,jpg,png,svg}'
                }]
            },
            contentImage: {
                files: [{
                    cwd: PATHS.SRC + PATHS.CONTENT,
                    dest: PATHS.DEST,
                    expand: true,
                    src: '**/*.{gif,jpg,png,svg}'
                }]
            }
        },

        filerev: {
            dist: {
                src: [
                    PATHS.DEST + PATHS.CSS + '**/*.css',
                    //PATHS.DEST + PATHS.IMG + '**/*.{gif,jpg,png,svg}',
                    PATHS.DEST + PATHS.JS + '**/*.js',
                    '!' + PATHS.DEST + PATHS.JS + 'vendors/*.js'
                    //PATHS.DEST + '{careers,locations,news,services,work}/**/*.{css,gif,jpg,js,png,svg}'
                ]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    cwd: PATHS.DEST,
                    dest: PATHS.DEST,
                    expand: true,
                    src: '**/*.html'
                }]
            }
        },

        /* javascript hinting */
        jshint: {
            options: {
                force: true,
                jshintrc: PATHS.SRC + '.jshintrc',
                reporter: require('jshint-stylish')
            },
            site: {
                files: [{
                    cwd: PATHS.SRC + PATHS.JS,
                    expand: true,
                    src: ['**/*.js', '!vendors/**/*.js', '!modernizr.js']
                }]
            },
            assemble: {
                files: [{
                    cwd: PATHS.SRC + PATHS.ASSEMBLE + 'helpers/',
                    expand: true,
                    src: '**/*.js'
                }]
            }
        },

        /* testing */
        karma: {
            options: {
                configFile: PATHS.TEST + 'karma.conf.js',
                runnerPort: 9999,
                browsers: ['Chrome', 'Firefox']
            },
            continuous: {
                singleRun: true,
                browsers: ['PhantomJS']
            },
            dev: {
                reporters: 'dots'
            }
        },

        /* output customised modernizr */
        modernizr: {
            site: {
                "devFile": 'src/assets/js/modernizr.js',
                "outputFile": 'dist/assets/js/modernizr.js'
            }
        },

        /* create css from our sass files */
        sass: {
            options: {
                trace: true
            },
            site: {
                options: {
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    src: ['**/*.scss', '!**/_*.scss'],
                    cwd: PATHS.SRC + PATHS.SASS,
                    dest: PATHS.SRC + PATHS.CSS,
                    ext: '.css'
                }]
            }
        },

        stripmq: {
            options: {
                width: 1060,
                type: 'screen'
            },
            all: {
                files: {
                    'dist/assets/css/main-ie.css': ['dist/assets/css/main.css']
                }
            }
        },

        usemin: {
            options: {
                assetsDirs: [
                    PATHS.DEST,
                    PATHS.DEST + PATHS.IMG
                ],
                patterns: {
                    js: [[/(img\/.*?\.(?:gif|jpg|png|svg))/gm, 'Update the JS to reference our revved images']]
                }
            },
            html: PATHS.DEST + '**/*.html',
            css: PATHS.DEST + PATHS.CSS + '**/*.css',
            js: PATHS.DEST + PATHS.JS + '**/*.js'
        },

        useminPrepare: {
            html: PATHS.DEST + 'index.html',
            options: {
                root: PATHS.DEST
            }
        },

        /* different watch options trigger different tasks */
        watch: {
            options: {
                livereload: true
            },
            assemble: {
                expand: true,
                files: [PATHS.SRC + PATHS.ASSEMBLE + '**/*.hbs', PATHS.SRC + PATHS.CONTENT + '**/*.hbs', PATHS.SRC + PATHS.CONTENT + '**/*.json'],
                tasks: 'newer:assemble'
            },
            assembleHelpers: {
                expand: true,
                files: [PATHS.SRC + PATHS.ASSEMBLE + 'helpers/**/*.js'],
                tasks: ['newer:jshint:assemble', 'newer:assemble']
            },
            contentCss: {
                expand: true,
                files: PATHS.SRC + PATHS.CONTENT + '**/*.css',
                tasks: ['newer:copy:contentCss']
            },
            contentImage: {
                expand: true,
                files: PATHS.SRC + PATHS.CONTENT + '**/*.{gif,jpg,png,svg}',
                tasks: ['newer:copy:contentImage']
            },
            images: {
                expand: true,
                files: PATHS.SRC + PATHS.IMG + '**/*.{gif,jpg,png,svg}',
                tasks: ['newer:copy:image']
            },
            fonts: {
                expand: true,
                files: PATHS.SRC + PATHS.FONTS + '**/*.*',
                tasks: ['copy:fonts']
            },
            redirectShortcuts: {
                expand: true,
                files: PATHS.SRC + PATHS.SHORTCUTS + '**/*.*',
                tasks: ['copy:redirectShortcuts']
            },
            sass: {
                expand: true,
                files: PATHS.SRC + PATHS.SASS + '**/*.scss',
                tasks: ['styles']
            },
            scripts: {
                expand: true,
                files: PATHS.SRC + PATHS.JS + '**/*.js',
                tasks: ['scripts']
            }
        },

        concurrent: {
            build: ['stream1', 'stream2']
        }

    });

    grunt.loadNpmTasks('assemble');
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    grunt.registerTask('root', ['copy:root']);
    grunt.registerTask('fonts', ['copy:fonts']);
    grunt.registerTask('images', ['copy:image']);
	grunt.registerTask('redirectShortcuts', ['copy:redirectShortcuts']);

    grunt.registerTask('styles', ['sass', 'autoprefixer:site', 'stripmq']);
    grunt.registerTask('scripts', ['jshint', 'copy:scripts']);

    grunt.registerTask('content', ['assemble', 'autoprefixer:content', 'copy:contentImage', 'copy:content']);

    // concurrent streams
    grunt.registerTask('stream1', ['styles', 'fonts', 'root', 'redirectShortcuts', 'images', 'modernizr', 'scripts']);
    grunt.registerTask('stream2', ['content']);

    // build tasks
    grunt.registerTask('build', ['clean:dist', 'concurrent:build']);
    
    // compression step including usemin
    grunt.registerTask('compress', ['useminPrepare', 'concat', 'cssmin', 'uglify', 'filerev', 'usemin', 'clean:useminTidy', 'copy:vendorScripts', 'htmlmin']);

    grunt.registerTask('run', ['connect', 'watch']);
    grunt.registerTask('runContent', ['connect:content', 'watch']);


    // TASKS TO BE RUN AT THE COMMAND LINE

    // default task for content authors
    grunt.registerTask('default', ['build', 'runContent']);

    // task for developers
    grunt.registerTask('dev', ['build', 'run']);

    // task for build server
    grunt.registerTask('production', ['build', 'compress']);

};