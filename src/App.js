import React, { Component } from 'react';
import { Provider } from "react-redux";
import store from './store';
import Input from './components/input';
import List from './components/list';
import './App.css';

const App = () => (
  <Provider store={store}>
    <div className="App">
      <Input />
      <List />
    </div>
  </Provider>
);

export default App;
