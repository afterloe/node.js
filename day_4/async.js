"use strict"

let a = () => new Promise((resolve, reject) => resolve("Hello"));
	
let b = () => new Promise((resolve, reject) => resolve("World"));

let conso = async function () {
	let first = await a();
	let second = await b();
	console.log(`${first} ${second} !`);
};
