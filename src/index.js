import AsyncLogic from "./AsyncLogic";

const createAsyncLogic = (type, logic) => {
  try {
    return new AsyncLogic(type, logic);
  } catch (err) {
    console.log(err);
    return err;
  }
};

const createAsyncLogicMiddleware = handlers => {
  return handlers.map(handler => {
    let logic;
    for (let key in handler) {
      logic = createAsyncLogic(key, handler[key]);
    }
    return store => next => async action => logic.runLogic(store, action, next);
  });
};

export default createAsyncLogicMiddleware;
