var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
	install : {
		updateFAD  : function(){
			this.conflicter.force = true;
			var self = this;
			var done = this.async();
			this.log('Updating FAD to the newest version...')
			this.remote('stolksdorf', 'FAD', 'master', function(err, remote) {
				remote.directory('.', 'FAD');
				done();
			}, true);
		},
	},
});