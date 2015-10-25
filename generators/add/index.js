var generators = require('yeoman-generator');
var _ = require('lodash');
var mkdirp = require('mkdirp');
var ejs = require('ejs');

module.exports = generators.Base.extend({
	testing : require('../../test_mode.js'),

	initializing : {
		readInfo : function(){
			if(!this.fs.exists(this.destinationPath('info.json'))){
				this.log("ERR: Can't find info.json. Make sure you're in the right mod directory");
			}
			this.info = this.fs.readJSON(this.destinationPath('info.json'));
		}
	},

	prompting : {
		objectTypes  : function(){
			var done = this.async();
			this.prompt({
				type: 'checkbox',
				name: 'types',
				message: 'What would you like to add? (use space to select)',
				choices: [
					{
						value : 'item',
						name : 'Item',
						checked : true
					},
					{
						value : 'recipe',
						name : 'Recipe',
						checked : true
					},
					{
						value : 'technology',
						name : 'Technology',
						checked : false
					},
					{
						value : 'entity',
						name : 'Entity',
						checked : true
					}
				]
			}, function(answers){
				this.makeItem = _.contains(answers.types, 'item');
				this.makeRecipe = _.contains(answers.types, 'recipe');
				this.makeTechnology = _.contains(answers.types, 'technology');
				this.makeEntity = _.contains(answers.types, 'entity');

				done();
			}.bind(this));
		},

		entityTemplate : function(){
			if(!this.makeEntity) return;

			var choices = _.map(['lamp', 'combinator', 'car', 'assembler', 'generator', 'turret'], function(type){
				return {
					value : type,
					name : type
				}
			});

			var done = this.async();
			this.prompt({
				type    : 'list',
				name    : 'entityType',
				message : 'What kind of entity do you want to base yours off of?',
				choices : choices
			}, function (answer) {
				this.entityType = answer.entityType;
				done();
			}.bind(this));
		},

		existingTech : function(){
			this.useExistingTech = false;
			if(!this.makeTechnology) return;
			var done = this.async();
			this.prompt([{
				type: 'confirm',
				name: 'existingTech',
				message: 'Would you add it to an existing technology?',
				default: true
			}], function (answer) {
				this.useExistingTech = answer.existingTech
				if(this.useExistingTech) this.makeTechnology = false;
				done();
			}.bind(this));
		},

		testingRecipe : function(){
			this.makeTestingRecipe = false;
			if(!this.makeItem) return;
			var done = this.async();
			this.prompt([{
				type: 'confirm',
				name: 'testingRecipe',
				message: 'Would you add a testing recipe?',
				default: true
			}], function (answer) {
				this.makeTestingRecipe = answer.testingRecipe
				done();
			}.bind(this));
		},

		objName : function () {
			var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'objName',
				message : 'What do you like to call it?'
			}, function (answer) {
				this.objTitle = _.startCase(answer.objName);
				this.objName = _.camelCase(answer.objName);
				this.obj_name = _.snakeCase(answer.objName);
				done();
			}.bind(this));
		}
	},

	writing : {

		checkFolder : function(){
			mkdirp.sync(this.destinationPath(this.objName));
			this.conflicter.force = true;
		},

		loadEntityInfo : function(){
			if(!this.makeEntity) return;
			this.entityPrototype = ejs.render(this.fs.read(this.templatePath(this.entityType + '/prototype.lua')), this);
		},

		makePrototype : function(){
			this.fs.copyTpl(
				this.templatePath('prototype.lua'),
				this.destinationPath(this.objName + '/prototype.lua'),
				this
			);
		},

		makeSchematic : function(){
			this.fs.copyTpl(
				this.templatePath('schematic.lua'),
				this.destinationPath(this.objName + '/schematic.lua'),
				this
			);
		},

		copyImages : function(){
			if(this.makeItem){
				this.fs.copy(this.templatePath('img/icon.png'), this.destinationPath(this.objName + '/img/icon.png'));
			}
			if(this.makeTechnology){
				this.fs.copy(this.templatePath('img/technology.png'), this.destinationPath(this.objName + '/img/technology.png'));
			}
			if(this.makeEntity){
				this.fs.copy(this.templatePath(this.entityType + '/img'), this.destinationPath(this.objName + '/img'));
			}
		},

		updateLocale : function(){
			var self = this;
			var locale = this.fs.read(this.destinationPath('locale/en/' + this.info.name + '.cfg'));

			var addTranslation = function(type, contents){
				var parts = contents.split(type);
				return parts[0] + type + '\n' + self.obj_name + ' = ' + self.objTitle + parts[1];
			}

			if(this.makeTechnology) locale = addTranslation('[technology-name]', locale);
			if(this.makeEntity)     locale = addTranslation('[entity-name]', locale);
			if(this.makeItem)       locale = addTranslation('[item-name]', locale);
			if(this.makeRecipe)     locale = addTranslation('[recipe-name]', locale);

			this.fs.write(this.destinationPath('locale/en/' + this.info.name + '.cfg'), locale);
		},

		addRefToData : function(){
			var self = this;
			this.fs.copy(this.destinationPath('data.lua'), this.destinationPath('data.lua'), {
				process: function(contents) {
					return contents.toString() +'\nrequire("' + self.objName + '.prototype")';
				}
			});
		},

		addRefToControl : function(){
			if(!this.makeEntity) return;
			var self = this;
			this.fs.copy(this.destinationPath('control.lua'), this.destinationPath('control.lua'), {
				process: function(contents) {
					return contents.toString() +'\nrequire("' + self.objName + '.schematic")';
				}
			});
		},


	}


});