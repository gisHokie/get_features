//https://gist.github.com/alanhoff/fe17f8cbc1888110ba33

var request = require('request');
var fs = require('fs'); // fs para escrever diretamente para o disco, much win
var Puid = require('puid');
var puid = new Puid(); // Isso aqui gera ID únicos, assim nunca vai sobreescrever
var path = require('path');
var Promise = require('bluebird');

var download = function(arquivo, pasta, callback){
    var p = new Promise(function(resolve, reject){
        var id = puid.generate();
		
		//Need to get the file name not the ID
		//Assumes that the URL will be a file with a file name suffixes
		// such as "*.zip"
		var splitName = arquivo.split('.');
		var lenSN = splitName.length - 2;
		
		var splitName2 = splitName[lenSN].split('/');
		var lenSN2 = splitName2.length - 1;
		//Set the name to the name of the compressed file name
		var fileName = splitName2[lenSN2];
	
		//Save the file to a known directory
        var dest = path.join(pasta, fileName);
        var writeStream = fs.createWriteStream(dest);

        // Avisando a promise que acabamos por aqui
        writeStream.on('finish', function(){
            resolve(fileName);
        });

        // Capturando erros da write stream
        writeStream.on('error', function(err){
            fs.unlink(dest, reject.bind(null, err));
        });

        var readStream = request.get(arquivo);

        // Capturando erros da request stream
        readStream.on('error', function(err){
            fs.unlink(dest, reject.bind(null, err));
        });

        // Iniciando a transferência de dados
        readStream.pipe(writeStream);
    });

    // Manter compatibilidade com callbacks
    if(!callback)
        return p;

    p.then(function(id){
        callback(null, id);
    }).catch(function(err){
        callback(err);
    });
};

module.exports = download;