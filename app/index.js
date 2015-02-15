'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  constructor:function(){
    yeoman.generators.Base.apply(this,arguments);
    this.argument('appName',{type:String,required:true});
  },
  prompting: function () {
    //var done = this.async();
    this.log('Prompting');
    // // Have Yeoman greet the user.
    // this.log(yosay(
    //   'Welcome to the world-class' + chalk.red('Uuf') + ' generator!'
    // ));

    // var prompts = [{
    //   type: 'confirm',
    //   name: 'someOption',
    //   message: 'Would you like to enable this option?',
    //   default: true
    // }];

    // this.prompt(prompts, function (props) {
    //   this.someOption = props.someOption;

    //   done();
    // }.bind(this));
  },

  writing: {
    app:function(){

        this.mkdir(this.appName);
        this.destinationRoot(this.appName);
        this.directory('lib','lib');
        this.mkdir('components');
        this.mkdir('pages');
        this.mkdir('layouts');
        //var files = ['fuse-router.js','fuse.jag','fuse.js','handlebars-helpers.js','handlebars-v2.0.0.js']
        this.fs.copyTpl(this.templatePath('jaggery.conf'),this.destinationPath('jaggery.conf'),{
          appName:this.appName
        });

        //this.invoke('pages',{args:{name:'test'}});
    }
  },

  install: function () {
    // this.installDependencies({
    //   skipInstall: this.options['skip-install']
    // });
  }
});
