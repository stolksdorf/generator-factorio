var generators = require('yeoman-generator');
var _ = require('lodash');
var path = require('path');

module.exports = generators.Base.extend({
	prompting : {
		modName : function () {
			var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'modName',
				message : 'Mod name',
				default : 'My Mod'
			}, function (answer) {
				this.rawmodName = answer.modName
				this.ModTitle = _.startCase(this.rawmodName);
				this.modName = _.camelCase(answer.modName);
				this.ModName = _.capitalize(this.modName);

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

		modVersion : function(){
			var done = this.async();
			this.prompt({
				type    : 'input',
				name    : 'version',
				message : 'Initial version',
				default : '0.0.0'
			}, function (answer) {
				this.version = answer.version
				done();
			}.bind(this));
		},

		askForFAD : function(){
			var done = this.async();
			this.prompt([{
				type: 'confirm',
				name: 'useFAD',
				message: 'Would you like to use FAD (Factorio Assisted Development) toolkit?',
				default: true
			}], function (answer) {
				this.useFAD = answer.useFAD
				done();
			}.bind(this));
		},
	},

	writing : {

		makeBaseMod : function(){
			this.basePath = this.ModName + '_' + this.version;

			this.fs.copyTpl(
				this.templatePath('data.lua'),
				this.destinationPath(path.join(this.basePath, 'data.lua')),
				this
			);
			this.fs.copyTpl(
				this.templatePath('info.json'),
				this.destinationPath(path.join(this.basePath, 'info.json')),
				this
			);
			this.fs.copyTpl(
				this.templatePath('locale.cfg'),
				this.destinationPath(path.join(this.basePath, 'locale', 'en',  this.ModName + '.cfg')),
				this
			);
			this.fs.copyTpl(
				this.templatePath('config.lua'),
				this.destinationPath(path.join(this.basePath, 'config.lua')),
				this
			);
			this.fs.copyTpl(
				this.templatePath('README.md'),
				this.destinationPath(path.join(this.basePath, 'README.md')),
				this
			);
		},

		makeFADControl : function(){
			if(!this.useFAD) return;
			this.fs.copyTpl(
				this.templatePath('control.lua'),
				this.destinationPath(path.join(this.basePath, 'control.lua')),
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
				remote.directory('.', path.join(self.basePath, 'FAD'));
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

