module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    test: {
      files: ['test/*.js']
    },
    lint: {
      files: ['grunt.js', 'tasks/*.js', 'test/*.js']
    },
    watch: {
      files: '<config:lint.files>',
      tasks: 'default'
    },
    jst: {
      "dist/template.js": [
        "templates/*.htm"
      ]
    },
    json2jst: {
      jst: "dist/template.js",
      json: "templates/demofile.json",
      output: "dist/templates.js",
      declareRegEx : "^",
      useRegex : "with\\(obj"
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      },
      globals: {}
    }
  });

  grunt.loadNpmTasks('grunt-contrib');
  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task.
  grunt.registerTask('default', 'jst json2jst');

};
