/**
 *	Promise.all
 *
 *	该方法获奖多个Promise实例包装程一个新的Promise实例,
 *	该方法接受的不一定是数组，但是必须要有iteratro接口，可以使用Generator为其添加遍历器。并且返回的对象必须是Promise对象
 *
 *	let p = Promise.all([p1,p2,p3]);
 *
 *	p的状态由p1,p2,p3的状态决定，只有所有的状态全部便曾fulfilled的时候p的状态才改变，而且他们会将返回值作为数组传递给p的回调函数
 *	如果有一个状态变成rejected，p的状态就会变成rejected，此时第一个被reject的实例的返回值会传递给P的回调函数
 *
 *	let promises = [2,3,4,5,6,7].map(id => getJSON(`/post/${id}.json`));
 *	Promise.all(promises).then(posts => console.log(posts)).catch(err => console.log(err));
 *
 */

/**
 *	Promise.race
 *
 *	该方法同上的作用，不同的是只要数组中任意一个Promise实习发生改变，p的状态就更着改变，而且先改变的Promise实例的返回值会传给p的回调函数
 *	
 */

// 如果返回的对象不是Promise对象，那么使用下列的API可以将非Promise对象转化为Promise对象。

/**
 *	Promise.resolve方法 中的参数不具有then方法，那么会返回一个新的Promise对象，且它的状态未Resolved
 *	这个方法也可以不需要参数，返回的是一个新的Promise对象。如果希望得到一个Promise对象，最方便的就是无参调用该方法
 */
let p = Promise.resolve("hello afterloe");

p.then(s => console.log(s));

/**
 *	Promise.reject 方法 同上，不过状态是 reject
 */
p = Promise.reject("hello grace");
p.catch(e => console.log(e));
