import "./App.css";

import React from "react";
import BlockList from "./pages/BlockList";
import SingleBlock from "./pages/SingleBlock";
import NewTransaction from "./pages/NewTransaction";
import MineBlock from "./pages/MineBlock";

const App = () => {
  return (
    <div>
      <BlockList />
      <SingleBlock />
      <NewTransaction />
      <MineBlock />
    </div>
  );
};

export default App;
