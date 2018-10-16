var fs = require('fs');

var read_json = function(json_file, keyServices, featDir, finalKey) {
		
	// Create an object to store the JSON keys and values
	var obj = JSON.parse(fs.readFileSync(json_file, 'utf8'));	

	//variable declarations
	var urlArray = [];
	var shapeNames = [];
	var urlList = [];

	//Loop through the JSON to get the URL to get each zipped shapefiles
	for(var keyname in obj){
		if (keyname == keyServices) {
			for(var shpName in obj[keyname]){
				//Add the shapefile keys to an array
				shapeNames.push(shpName);
			};
		shapeNames.forEach(function(elem){
			//Add each URL to an array
			myURL = obj[keyname][elem][finalKey];
	
			if(myURL.length > 0){
				urlList.push(myURL);
			}//if myURL
		}); //shapeNames
		};  //if keyname
	}; 		//for keyname
	
	return urlList;	
}; // Function

//Set this as a module
module.exports = read_json;