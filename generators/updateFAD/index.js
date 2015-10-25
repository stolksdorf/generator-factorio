var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({
	testing : require('../test_mode.js'),

	install : {
		updateFAD  : function(){
			this.conflicter.force = true;
			var self = this;
			var done = this.async();
			this.log('Updating FAD to the newest version...')
			this.remote('stolksdorf', 'FAD', function(err, remote) {
				remote.directory('.', 'FAD');
				done();
			});
		},
	},
});