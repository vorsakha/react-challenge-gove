import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { Switch, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Details from "./pages/Details";
import apiReducer from "./redux/api/slice";
import searchReducer from "./redux/searchResults/slice";
import pageReducer from "./redux/page/slice";

// Redux Config
const reducer = combineReducers({
  apiReducer,
  searchReducer,
  pageReducer,
});

const store = configureStore({
  reducer,
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;

function App() {
  const location: any = useLocation();

  const background = location.state && location.state.background;

  return (
    <Provider store={store}>
      <Layout>
        <Switch location={background || location}>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/page/:id" component={Dashboard} />
        </Switch>

        <Route path="/details/:id" component={Details} />
      </Layout>
    </Provider>
  );
}

export default App;
