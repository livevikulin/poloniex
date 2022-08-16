import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Quotes from "./layouts/quotes";
import About from "./layouts/about";
import NavBar from "./components/Navbar";
import { getTickers } from "./store/tickers";
import {useDispatch, useSelector} from "react-redux";

function App() {
    const state = useSelector(state => state);
    const dispatch = useDispatch();

    // @ts-ignore
    const { modal } = state;

    useEffect((): () => void => {
        let updateFetch: any;
        // @ts-ignore
        dispatch(getTickers());

        if (modal) {
            return () => clearInterval(updateFetch);
        } else {
            updateFetch = setInterval(() => {
                dispatch(getTickers());
            }, 5000);
        }

        return () => clearInterval(updateFetch);
    }, [modal]);

  return (
      <>
        <NavBar />
        <Switch>
          <Route path="/quotes" component={Quotes} />
          <Route path="/" exact component={About} />
          <Redirect to="/" />
        </Switch>
      </>
  );
}

export default App;
