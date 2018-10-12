var readjson = require('./lib/read_json.js');
var download = require('./lib/download');

var myJSON = 'E:/test_scripts/the_weather/config/list_features.json';
var keyserv = 'shapefiles';
var featDir = './shp';
var finalKey = 'url';

//Get the URL from a custom JSON file
var rj = readjson(myJSON, keyserv, featDir, finalKey);
console.log(rj);

//Download the data by URL
rj.forEach(function(urlElem){
download(urlElem, featDir)
	.then(function(shpName){
		console.log('Saved %s', shpName);
	})
	.catch(function(err){
		console.log(err.stack);
	});
}); //urlList.forEach

//Unzip the shapefiles


//Call PostGIS to get shape file and import to PostGres


//Postgres Stuff??