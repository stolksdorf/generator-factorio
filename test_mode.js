var TEST_MODE = true;

module.exports = function(){
	if(TEST_MODE){
		this.log('\n!!!YOU ARE IN TEST MODE!!!\n');
		this.destinationRoot(this.destinationPath('TEST'));
	}
};