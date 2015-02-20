'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
module.exports = generators.NamedBase.extend({
    prompting: function() {
        var done = this.async();
        var qAskHasComponentScript = {
            type: 'confirm',
            name: 'hasComponentScript',
            message: 'Does your unit include a view model script? '
        };
        var qAskHasComponentView = {
            type: 'confirm',
            name: 'hasComponentView',
            message: 'Does your unit have a view?'
        };
        var qAskHasLayout = {
            when: function(response) {
                return response.hasComponentView;
            },
            type: 'confirm',
            name: 'hasLayout',
            message: 'Does your unit view use a layout? '
        };
        var qAskLayoutName = {
            when: function(response) {
                return response.hasLayout;
            },
            type: 'input',
            name: 'layoutName',
            message: 'Enter your layout name: '
        };
        var qAskHasComponentJSON = {
            type: 'confirm',
            name: 'hasComponentJSON',
            message: 'Does your unit have a unit.json file ?'
        };
        var qAskHasParentComponent = {
            when: function(response) {
                return response.hasComponentJSON;
            },
            type: 'confirm',
            name: 'hasParentComponent',
            message: 'Does your unit extend from a parent unit? '
        };
        var qAskParentComponent = {
            when: function(response) {
                return response.hasParentComponent;
            },
            type: 'input',
            name: 'parentComponent',
            message: 'Enter the name of the parent unit:'
        };
        var qAskHasPredicate = {
            when: function(response) {
                return response.hasComponentJSON;
            },
            type: 'confirm',
            name: 'hasPredicate',
            message: 'Does your unit have a predicate? '
        };
        var qAskPredicate = {
            when: function(response) {
                return response.hasPredicate;
            },
            type: 'input',
            name: 'predicate',
            message: 'Enter a predicate for the unit: '
        };
        this.prompt([qAskHasComponentScript, qAskHasComponentView,qAskHasLayout,qAskLayoutName,qAskHasComponentJSON,qAskHasPredicate,qAskPredicate,qAskHasParentComponent,qAskParentComponent], function(response) {
            this.log('Done!');
            this.hasComponentJSON = response.hasComponentJSON;
            this.hasPredicate  = response.hasPredicate;
            this.hasParentComponent = response.hasParentComponent;
            this.predicate = response.predicate;
            this.parentComponent = response.parentComponent;
            this.layoutName = response.layoutName;
            this.hasLayout = response.hasLayout;
            this.hasComponentScript = response.hasComponentScript;
            this.hasComponentView = response.hasComponentView;
            done();
        }.bind(this));
    },
    writing: function() {
        var componentName = this.name;
        var destinationRoot = this.destinationRoot();
        this.destinationRoot('units');
        //Create the component directory
        this.mkdir(this.name);
        if (this.hasComponentJSON) {
        	this.log('Creating the unit.json');
        	this.log('Has predicate? '+this.hasPredicate);
        	this.log('Has parent unit? '+this.hasParentComponent);
        	this.log('Predicate: '+this.predicate);
        	this.log('Unit: '+this.parentComponent);
            this.fs.copyTpl(this.templatePath('unit.json'), this.destinationPath(componentName + '/' + componentName + '.json'), {
                hasPredicate: this.hasPredicate,
                hasParentComponent:this.hasParentComponent,
                parentComponent:this.parentComponent,
                predicate: this.predicate
            });
        }

        if(this.hasComponentView){
        	this.log('Creating unit view');
        	this.log('Layout '+this.layoutName);
        	this.fs.copyTpl(this.templatePath("unit.hbs"), this.destinationPath(componentName+'/'+componentName+'.hbs'),{
        		hasLayout:this.hasLayout,
        		layoutName:this.layoutName
        	});
        }

        if(this.hasComponentScript){
        	this.log('Creating unit script');
        	this.fs.copyTpl(this.templatePath('unit.js'),this.destinationPath(componentName+'/'+componentName+'.js'));
        }

        this.destinationRoot(destinationRoot);
    }
});