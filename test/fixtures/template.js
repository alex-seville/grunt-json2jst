this['JST'] = this['JST'] || {};

this['JST']['templates/test.htm'] = function(obj){
var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};
with(obj||{}){
__p+='hi. '+
(intro)+
'.\nthis is a test template.\n'+
(end)+
'';
}
return __p;
};