export const FETCH_VALUE = "FETCH_VALUE";
export const SET_VALUE = "SET_VALUE";
export const TRANSFORM_VALUE = "TRANSFORM_VALUE";

const INITIAL_STATE = {
  value: "a"
};

const setValue = (state, action) => {
  const { value } = action;
  return {
    ...state,
    value
  };
};

const actionHandlers = { [SET_VALUE]: setValue };

const createReducer = (handlers, intialState) => {
  return (state = intialState, action) => {
    const { type } = action;
    return handlers[type] ? handlers[type](state, action) : state;
  };
};

export const testReducer = createReducer(actionHandlers, INITIAL_STATE);
