var fs = require('fs');


function read_dir(pathDir, fileType){
	var fileList = [];
	fs.readdirSync(pathDir).forEach(file => {
	  fileList.push(file);
	});
	return fileList;
};//function


//Set this as a module
module.exports = read_dir;