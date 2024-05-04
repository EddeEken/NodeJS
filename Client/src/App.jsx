import "./App.css";

import React from "react";
import BlockList from "./pages/BlockList";
import SingleBlock from "./pages/SingleBlock";
import NewTransaction from "./pages/NewTransaction";

const App = () => {
  return (
    <div>
      <BlockList />
      <SingleBlock />
      <NewTransaction />
    </div>
  );
};

export default App;
