var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
	prompting : {
		modName : function () {
			var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'modName',
				message : 'Mod name',
				default : _.startCase(this.appname)
			}, function (answer) {
				this.rawmodName = answer.modName
				this.ModTitle = _.startCase(this.rawmodName);
				this.modName = _.camelCase(answer.modName);
				this.ModName = _.capitalize(this.modName);

				this.log(this.ModTitle, this.modName, this.ModName);
				done();
			}.bind(this));
		},

		modDescription : function(){
			var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'description',
				message : 'Mod Description'
			}, function (answer) {
				this.description = answer.description
				done();
			}.bind(this));
		},

		modAuthor : function(){
			var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'author',
				message : 'Author'
			}, function (answer) {
				this.author = answer.author
				done();
			}.bind(this));
		},

		askForFAD : function(){
			var done = this.async();
			this.prompt([{
				type: 'confirm',
				name: 'useFAD',
				message: 'Would you like to use FactorioAssistedDevelopment (FAD) toolkit?',
				default: true
			}], function (answer) {
				this.useFAD = answer.useFAD
				done();
			}.bind(this));
		},
	},

	writing : {

		makeBaseMod : function(){
			this.fs.copyTpl(
				this.templatePath('data.lua'),
				this.destinationPath('data.lua'),
				this
			);
			this.fs.copyTpl(
				this.templatePath('info.json'),
				this.destinationPath('info.json'),
				this
			);
			this.fs.copyTpl(
				this.templatePath('locale.cfg'),
				this.destinationPath('locale/en/' + this.ModName + '.cfg'),
				this
			);
			this.fs.copyTpl(
				this.templatePath('config.lua'),
				this.destinationPath('config.lua'),
				this
			);
			this.fs.copyTpl(
				this.templatePath('README.md'),
				this.destinationPath('README.md'),
				this
			);
		},

		makeFADControl : function(){
			if(!this.useFAD) return;
			this.fs.copyTpl(
				this.templatePath('control.lua'),
				this.destinationPath('control.lua'),
				this
			);
		},
	},

	install : {
		grabFAD  : function(){
			if(!this.useFAD) return;
			var self = this;
			var done = this.async();
			this.remote('stolksdorf', 'FAD', 'master', function(err, remote) {
				remote.directory('.', 'FAD');
				done();
			}, true);
		},
	},

	end : {
		goodBye : function(){
			this.log("\n\n\nAll done! Happy Modding!");
		}
	}

});

