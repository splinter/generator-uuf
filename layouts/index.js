'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
module.exports = generators.NamedBase.extend({
    prompting: function() {
    },
    writing: function() {
        var layoutName = this.name;
        var destinationRoot = this.destinationRoot();
        this.destinationRoot('layouts');
        this.fs.copyTpl(this.templatePath('layout-template.hbs'), this.destinationPath(layoutName + '.hbs'));
        this.destinationRoot(destinationRoot);
    }
});