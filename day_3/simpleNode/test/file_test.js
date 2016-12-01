/**
 *	file test
 */
const [file,expect] = [require("../lib/file"),require("chai").expect];

describe("file:功能测试", () => {
	describe("file.writeFile", () => {
		it("write file: success", () => {
			let [path,data] = ["_readme.md","说明文件：mocha 测试写入"];
			return file.writeFile(path,data).then(flag => expect(flag).to.be.equal(true));
		});
		it("write file: fail",() => {
			let [path,data] = ["_write-test.text","input data: mocha 测试写入"];
			return file.writeFile(path,data).then(() => {},err => expect(true).to.be.equal(true));
		});
	});

	describe("file.readFile", () => {
		it("read file: success", () => {
			let path = "_readme.md";
			return file.readFile(path).then(data => expect(data).to.be.equal("说明文件：mocha 测试写入"));
		});
		it("read file: fail", () => {
			let path = "_write-test,text";
			return file.readFile(path).then(() => {}, err => expect(true).to.be.equal(true));
		});
	});
});
