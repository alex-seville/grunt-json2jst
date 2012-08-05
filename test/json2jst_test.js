var grunt = require('grunt');

exports['json2jst'] = {
  setUp: function(done) {
    //we need to override the io methods
    done();
  },
  tearDown: function(done) {
    done();
  },
  'helper json2jst': function(test) {
    test.expect(2);
    // tests here
    var templateFile = grunt.file.read(grunt.file.expandFiles("test/fixtures/template.js")),
        jsonFile = grunt.file.read(grunt.file.expandFiles("test/fixtures/demofile.json")),
        declareRegEx = "^",
        useRegex = "with\\(obj";

    var result = grunt.helper('json2jst',templateFile,jsonFile,declareRegEx,useRegex);
    test.ok(result);
    test.ok(true,"done.");
    test.done();
  }
};
