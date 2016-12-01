/**
 *	file内容
 */
const [fs,path,utils] = [require("fs"),require("path"),require("./utils")];

let writeFile = (file, data) => {
	let deferred = utils.getDef();
	file = path.resolve(file);
	fs.writeFile(file,data,"utf8",err => err? deferred.reject(err):deferred.resolve(true));
	return deferred.promise;
};

let readFile = file => {
	let deferred = utils.getDef();
	file = path.resolve(file);
	fs.readFile(file,"utf8",(err,data) => err? deferred.reject(err):deferred.resolve(data));
	return deferred.promise;
};

module.exports = {
	writeFile,readFile
};
