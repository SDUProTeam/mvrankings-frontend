import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./pages/Home";
import DetailPage from "./pages/Detail";
import ErrorPage from "./pages/ErrorPage";

function App() {
  return (
    <BrowserRouter forceRefresh={true} basename="/mvrankings">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/detail/:id">
          <DetailPage />
        </Route>
        <Route path="*">
          <ErrorPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
