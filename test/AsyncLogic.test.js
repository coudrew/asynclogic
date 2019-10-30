import { expect } from "chai";
import AsyncLogic from "../src/AsyncLogic";

describe("AsyncLogic", () => {
  it("Throws error with no type", () => {
    expect(() => new AsyncLogic({ logic: () => {} })).to.throw();
  });

  it("Throws error with no logic", () => {
    expect(() => new AsyncLogic({ type: "SOME_TYPE" })).to.throw();
  });

  it("Checks type before running logic", () => {
    let logicCalled = false;
    function logic(store, action, done) {
      logicCalled = true;
      done();
    }
    const type = "THIS_TYPE";
    let actual = new AsyncLogic({ type, logic });
    const store = {};
    const action = {};
    actual.runLogic(store, { type: "THAT_TYPE" }, () => {});
    expect(logicCalled).to.eql(false);
    actual.runLogic(store, { type: "THIS_TYPE" }, () => {});
    expect(logicCalled).to.eql(true);
  });
});
