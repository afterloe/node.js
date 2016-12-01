function* iterTree(tree){
	if(Array.isArray(tree)){				//	判断对象是否是数组
		for(let i=0; i< tree.length; i++){
			yield* iterTree(tree[i]);		// 	递归
		}
	} else {
		yield tree;	// 不是则返回数据
	}
}

const tree = ["a",["b","c"],["d","e"]];

for(let x of iterTree(tree)){
	console.log(x);
}
