import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import apiReducer from "./redux/api/slice";
import searchReducer from "./redux/searchResults/slice";

// Redux Config
const reducer = combineReducers({
  apiReducer,
  searchReducer,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

function App() {
  let location: any = useLocation();

  let background = location.state && location.state.background;

  return (
    <Provider store={store}>
      <Layout>
        <Switch location={background || location}>
          <Route exact path="/" component={Dashboard} />
        </Switch>

        {background && <Route path="/details/:id" component={Details} />}
      </Layout>
    </Provider>
  );
}

export default App;
