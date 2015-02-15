'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
module.exports = generators.NamedBase.extend({
    prompting: function() {
    	var done = this.async();
        this.prompt({
            type: 'input',
            name: 'layoutName',
            message: 'Please enter the layout you wish to use for this page? (TIP: Check your layouts folder for available layouts'
        }, function(answers) {
            this.log(answers.layoutName);
            this.layoutName = answers.layoutName;
            done();
        }.bind(this));
    },
    writing: function() {
        var pageName = this.name;
        var message = 'Generating the '+chalk.red(pageName)+' page with the '+chalk.red(this.layoutName)+' layout.';
        this.log(yosay(message));
        var destinationRoot = this.destinationRoot();
        this.destinationRoot('pages');
        this.fs.copyTpl(this.templatePath('page-template.hbs'), this.destinationPath(pageName + '.hbs'), {
            layoutName: this.layoutName
        });
        this.destinationRoot(destinationRoot);
    }
});