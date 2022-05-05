import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Quotes from "./layouts/quotes";
import About from "./layouts/about";
import NavBar from "./components/Navbar";

function App() {
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
