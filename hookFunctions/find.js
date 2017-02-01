var fs = require('fs');
var colors = require('colors');
var utils = require('../lib/utils');

function customLog(peripheralId, service, characteristic, type, data, eventEmitter, callback){

	console.log('customLog hook');
	var toSave = '';

	switch (type){
		case 'read': toSave +='< R: '; break;
		case 'write': toSave +='> W: '; break;
		case 'notify': toSave +='< N: '; break;
	}
	toSave += characteristic + ' : ' + data.toString('hex') + ' ('+utils.hex2a(data.toString('hex'))+')\n';
  	fs.appendFile("dump/save", toSave, function(err) {
    	if(err) {
    		//todo: to callback
        	return console.log(err);
    	}
    //console.log("The file was saved!");
  	}); 

  	callback(null, data);
}

function hookDynamicNotify(peripheralId, service, characteristic, type, data, wsclient, callback){

	console.log('    hookDynamicNotify called'.yellow);
	datastr = data.toString('hex');

	console.log('    uuid:' + characteristic);
	console.log('    data(txt):' + data);
	console.log('    data(hex):' + datastr);

	//callback(null, new Buffer(datastr,'hex'));
	callback(null, new Buffer('41424344','hex'));
	//wsclient.notify(peripheralId, service, characteristic, new Buffer('12','hex'), null)
}

function hookDynamicRead(peripheralId, service, characteristic, type, data, wsclient, callback){

	console.log('    hookDynamicRead called'.yellow);
	datastr = data.toString('hex');

	//console.log('    uuid:' + characteristic);
	//console.log('    data(txt):' + data);
	//console.log('    data(hex):' + datastr);

	callback(null, data);
	//callback(null, new Buffer(datastr,'hex'));
	//callback(null, new Buffer('61626364','hex'));
	//wsclient.read(peripheralId, service, characteristic, null)
}


function hookDynamicWrite(peripheralId, service, characteristic, type, data, wsclient, callback){

	console.log('    hookDynamicWrite called'.yellow);
	datastr = data.toString('hex');

	console.log('    uuid:' + characteristic);
	console.log('    data(txt):' + data);
	console.log('    data(hex):' + datastr);

	if (characteristic === '2a06') {
		datastr='06';		// 0x06: push a buzzer.
		//datastr='07';		// 0x07: push a buzzer.
		console.log('    ovewrite to:' + datastr);
	}

	callback(null, new Buffer(datastr,'hex'));
}


function hookDynamicExtendedProperties(peripheralId, service, characteristic, type, data, eventEmitter, callback){

	console.log('    hookDynamicExtendedProperties called'.yellow);
	datastr = data.toString('hex');

	console.log('    uuid:' + characteristic);
	console.log('    data(txt):' + data);
	console.log('    data(hex):' + datastr);

	callback(null, new Buffer(datastr,'hex'));
}


function hookDynamicNotifyBattery(peripheralId, service, characteristic, type, data, wsclient, callback){

	console.log('   hookDynamicNotifyBattery called. overwriting notify message.'.yellow);
	datastr = data.toString('hex');

	console.log('    uuid:' + characteristic);
	console.log('    data(txt):' + data);
	console.log('    data(hex):' + datastr);

	callback(null, new Buffer('3435','hex'));
	//wsclient.notify(peripheralId, service, characteristic, new Buffer('12','hex'), null)
}


function hookDynamicReadBattery(peripheralId, service, characteristic, type, data, wsclient, callback){

	console.log('    hookDynamicReadBattery called. overwriting read message.'.yellow);
	datastr = data.toString('hex');

	console.log('    uuid:' + characteristic);
	console.log('    data(txt):' + data);
	console.log('    data(hex):' + datastr);

	//callback(null, new Buffer(datastr,'hex'));
	callback(null, new Buffer('3637','hex'));
	//wsclient.read(peripheralId, service, characteristic, null)
}

module.exports.customLog = customLog;
module.exports.hookDynamicNotify = hookDynamicNotify;
module.exports.hookDynamicRead = hookDynamicRead;
module.exports.hookDynamicWrite = hookDynamicWrite;
module.exports.hookDynamicExtendedProperties = hookDynamicExtendedProperties;

module.exports.hookDynamicNotifyBattery = hookDynamicNotifyBattery;
module.exports.hookDynamicReadBattery = hookDynamicReadBattery;
