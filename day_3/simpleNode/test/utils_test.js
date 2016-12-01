/**
 *	utils test
 */
const [utils,expect] = [require("../lib/utils"), require("chai").expect];

describe("utils 工具方法测试",() => {

	describe("utils.getDef", () => {
		let deferred = utils.getDef();
		it("defe成功",() => {
			deferred.resolve(true);
			return deferred.promise.then(data => expect(data).to.be.equal(true));
		});
		it("defe失败",() => {
			deferred.resolve(true);
			return deferred.promise.then(() => {},data => expect(data).to.be.equal(true));
		});
	});

	describe("utils.when", () => {
		let [deferred1,deferred2,deferred3,deferred4] = [utils.getDef(),utils.getDef(),utils.getDef(),utils.getDef()]

		it("when success", () => {
			deferred1.resolve(true);
			deferred2.resolve(true);

			return utils.when([deferred1.promise,deferred2.promise]).then(data => {
				expect(data).to.be.deep.equal([true,true]);
			});
		});

		it("when fail", () => {
			deferred3.resolve(true);
			deferred4.resolve(false);

			return utils.when([deferred3.promise,deferred4.promise]).then(() => {}, data => expect(data).to.be.equal(false));
		});
	});
});
