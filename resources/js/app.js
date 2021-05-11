require("./bootstrap");
import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./redux/redux";

// App --------------------------------------------------------------
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Routing from "./router/index";
// ------------------------------------------------------------------

const storeRedux = createStore(rootReducer);

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routing />
        {/* <Login/> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

ReactDOM.render(
    <Provider store={storeRedux}>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </Provider>,
    document.getElementById("root")
);

// require("./components/Example");
