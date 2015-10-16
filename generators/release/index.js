var generators = require('yeoman-generator');
var _ = require('lodash');
var archiver = require('archiver');
var fs = require('fs');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({
	testing : require('../../test_mode.js'),

	constructor: function () {
		generators.Base.apply(this, arguments);
		this.argument('version', { type: String, optional:true, required:false});
	},

	initializing : {
		readInfo : function(){
			if(!this.fs.exists(this.destinationPath('info.json'))){
				this.log("ERR: Can't find info.json. Make sure you're in the right mod directory");
			}
			this.info = this.fs.readJSON(this.destinationPath('info.json'));

			if(!this.version){
				this.log('No version specified. Using', this.info.version);
				this.version = this.info.version;
			}
		},
	},

	writing : {
		updateinfo : function(){
			if(this.version != this.info.version){
				this.log('Updating info with version', this.version, '\n');
				this.info.version = this.version;
				this.fs.writeJSON(this.destinationPath('info.json'), this.info);
			}
		},
	},

	install : {
		makeZip : function(){
			var self = this;
			var done = this.async();
			mkdirp.sync(this.destinationPath('releases'));

			var releaseName = this.info.name + '_' + this.info.version + '.zip';
			var output = fs.createWriteStream(this.destinationPath('releases/' + releaseName));
			var archive = archiver.create('zip', {});

			output.on('close', function() {
				self.log('\nCreated a new release!', releaseName);
				done();
			});

			archive.on('error', function(err){ throw err; });
			archive.pipe(output)
			archive.bulk([
				{ expand: true, cwd: this.destinationPath(''), src: ['**', '!releases/**', '!.git/**', '!.gitignore'] }
			]);
			archive.finalize();
		},
	},

});