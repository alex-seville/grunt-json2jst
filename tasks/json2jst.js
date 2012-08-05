module.exports = function(grunt) {

  // ==========================================================================
  // TASKS
  // ==========================================================================

  grunt.registerMultiTask('json2jst', 'Convert add resource into file.', function() {
    tmp = grunt.config(['json2jst', this.target, 'options']);
    if (typeof tmp === 'object') {
      grunt.verbose.writeln('Using "' + this.target + '" json2jst options.');
      options = tmp;
    } else {
      grunt.verbose.writeln('Using master json2jst options.');
      options = {
        jst: "dist/template.js",
        json: "templates/demofile.json",
        output: "dist/template.js",
        declareRegEx : "^",
        useRegex : "with\\(obj"
      };
    }

    var filepath = grunt.file.expandFiles(options.jst);
    grunt.verbose.writeln("reading template from: "+filepath);
    var jsonFilepath = grunt.file.expandFiles(options.json);
    var templateContent = grunt.file.read(filepath),
        jsonContent = grunt.file.read(jsonFilepath);
    grunt.verbose.writeln("reading json from: "+jsonFilepath);

    var updatedTemplate = grunt.helper(
      'json2jst',templateContent,
      jsonContent,options.declareRegEx,options.useRegex);
    grunt.verbose.writeln("update file:"+updatedTemplate);
    grunt.file.write(grunt.file.expandFiles(options.output)[0],updatedTemplate);
    // Fail task if errors were logged.
    if (this.errorCount) { return false; }

    // Otherwise, print a success message.
    grunt.log.writeln('File converted.');
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================

  // Concat source files and/or directives.
  grunt.registerHelper('json2jst', function(jstContent,jsonContent,declareRegEx,useRegex) {
    //ideally we want this to match a regex passed in by the grunt config
    //file, to match the template path with the resource file
    var resourceData = JSON.parse(jsonContent),
      resourceObjInitStr = "var __resourceData="+JSON.stringify(resourceData)+";",
      resourceObjUseStr = "_.extend(__resourceData,obj);with(obj";
    
    if (!resourceData){
      grunt.log.writeln("error parsing json.");
      return;
    }
    grunt.verbose.writeln("json parsed.");
    jstContent = jstContent.replace(new RegExp(declareRegEx),resourceObjInitStr);
    grunt.verbose.writeln("declaration added.");
    jstContent = jstContent.replace(new RegExp(useRegex),resourceObjUseStr);
    grunt.verbose.writeln("use added.");
    return jstContent;
  });
};