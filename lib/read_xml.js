// author: Scott D. McDermott
// date: 10/10/2018
// description: Read XML from a URL, converts to JSON, and store as a JSON file



var urllib = new require('urllib');
var https = require('https');
var fs = require('fs');
var xml2js = require('xml2js');
const util = require('util');

//Set explicitArray to false to avoid setting all values as an array
var parser = new xml2js.Parser( {explicitArray:false} );

var convertXMLtoJSON = function(xmlFeed, jsonDir){
//Error handler for XML to JSON parser
parser.on('error', function(err) { console.log('Parser error', err); });

// Need to read the XML from a URL which requires a header.  URLLIB allows headless connections
urllib.request(xmlFeed, function(err, data, res) {
	if (err) {
		throw err;
	}; //if
	//console.log(res.statusCode);
	//console.log(res.headers);
	//console.log(data.toString());
	
	//Parses the XML data in the URL
	var myJson = parser.parseString(data, function(err, result) {
		//a console out put that can be removed
		//console.log(util.inspect(result, {showHidden: false, depth: null}));
		//Convert the results from the parser to JSON
		newJson = JSON.stringify(result);
		console.log(newJson);
		//Writes the JSON to a file
		fs.writeFileSync(jsonDir, newJson);
	});  //myJson
		
});  //urllib
}; //convertXMLtoJSON


module.exports = convertXMLtoJSON;
