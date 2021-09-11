import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { AnimatePresence } from "framer-motion";
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
  const location: any = useLocation();

  // Background of the modal route
  const background = location.state && location.state.background;

  return (
    <Provider store={store}>
      <Layout>
        <Switch location={background || location}>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/page/:id" component={Dashboard} />
        </Switch>

        <AnimatePresence>
          <Route path="/details/:id" component={Details} />
        </AnimatePresence>
      </Layout>
    </Provider>
  );
}

export default App;
