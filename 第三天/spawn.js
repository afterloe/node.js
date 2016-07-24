function spawn(genF){
	return new Promise((resolve,reject) => {
		let gen = genF();

		function step(nextF){
			let next;
			try{
				next = nextF();
			} catch(e){
				return e;
			}
			if(next.done){
				return resolve(next.value);
			}
			Promise.resolve(next.value).then(v => step(() => gen.next(v))).catch(e => step(() => gen.throw(e)));
		}
		step(() => gen.next(undefined));
	});
};

module.exports = spawn;
