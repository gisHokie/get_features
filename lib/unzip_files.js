//https://www.npmjs.com/package/unzip
//https://code-maven.com/list-content-of-directory-with-nodejs

var fs = require('fs');
var unzip = require('unzip');

function unzip_files(fileDir, fileList, outpath){
	//loop in directory to get zipped fileSize
	//Add files to an array
	uzipArray = [];
	//Loop through array to unzip files to an output directory`
	
	for(i = 0; i < fileList.length; i++){
		filePath = fileDir + '/' + fileList[i];
		console.log('unzipping: ' + filePath);
		fs.createReadStream(filePath).pipe(unzip.Extract({ path: outpath}));
	}; //for
}; //function

//Set this as a module
module.exports = unzip_files;