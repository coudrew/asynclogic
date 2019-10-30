export default class AsyncLogic {
  constructor(props) {
    const { type, logic } = props;
    if (!type) throw new Error("action type is undefined");
    if (!logic) throw new Error("logic is undefined");
    this.type = type;
    this.logic = (store, action) =>
      new Promise(resolve => logic(store, action, resolve));
  }

  checkType = type => type && type === this.type;
  runLogic = async (store, action, next) => {
    const { type } = action;
    if (this.checkType(type)) {
      return await this.logic(store, action).then(() => next(action));
    } else {
      return next(action);
    }
  };
}
