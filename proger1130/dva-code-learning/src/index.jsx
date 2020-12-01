import React from "react";
import dva, { connect } from "./dva";
import { createBrowserHistory } from "history";

let app = dva({
  history: createBrowserHistory(),
});

app.model({
  namespace: "counter",
  state: {
    number: 0,
  },
  reducers: {
    // 更新数据
    updateState(state, { payload }) {
      return { ...state, ...payload };
    },
    add(state) {
      return { number: state.number + 2 };
    },
    ["counter/add"](state) {
      // ["counter/add"] 这样写的原因是,getReducer还没有对 type 做处理
      return { number: state.number + 1 };
    },
  },
  subscriptions: {},
});

function Counter(props) {
  return (
    <div>
      <div> {props.number} </div>
      <button onClick={() => props.dispatch({ type: "add" })}>+</button>
    </div>
  );
}

let ConnectCounter = connect((state) => state.counter)(Counter);

app.router(() => <ConnectCounter />);
app.start("#root");
