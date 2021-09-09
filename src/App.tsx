import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Redux Config
const reducer = combineReducers({
  // auth: authReducer,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
