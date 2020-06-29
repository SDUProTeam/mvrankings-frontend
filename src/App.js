import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import HomePage from "./pages/Home";
import DetailPage from "./pages/Detail";
import ErrorPage from "./pages/ErrorPage";
import { useState } from "react";
import cookie from "react-cookies";
import Personalize from "./pages/Personalize";

function App() {
  const [loginData, updateLoginData] = useState({
    login: cookie.load("_id") !== undefined,
  });

  const [openLogin, setOpenLogin] = useState(false);

  const handleLoginClose = () => {
    setOpenLogin(false);
  };

  const handleLoginOpen = () => {
    setOpenLogin(true);
  };

  const handleAccountChange = () => {
    updateLoginData({
      login: cookie.load("_id") !== undefined,
    });
  };

  const exitLogin = () => {
    cookie.remove("_id", { path: "/" });
    handleAccountChange();
    alert("注销成功");
  };

  const loginState = {
    loginOpen: handleLoginOpen,
    loginClose: handleLoginClose,
    isOpen: openLogin,
    data: loginData,
    loginChange: handleAccountChange,
    exitLogin: exitLogin,
  };

  return (
    <>
      <BrowserRouter forceRefresh={true} basename="/mvrankings">
        <Switch>
          <Route exact path="/">
            <HomePage loginState={loginState} />
          </Route>
          <Route exact path="/detail/:id">
            <DetailPage loginState={loginState} />
          </Route>
          <Route exact path="/personalize">
            <Personalize loginState={loginState} />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
