import './App.css'

// npm install axios 
import React from 'react';
import BlockList from './BlockList';
import SingleBlock from './SingleBlock';
import NewTransaction from './NewTransaction';

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
