import React from "react";

import "app/App.css";
import logo from "app/logo.svg";
import { Header, CommentModal, Body } from "components";

function App() {
  return (
    <>
      <Header />

      <CommentModal />

      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </div>
      <Body />
    </>
  );
}

export default App;
