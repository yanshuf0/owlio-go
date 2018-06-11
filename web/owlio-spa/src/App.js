import React, { Component } from 'react';
import Nav from './Nav/nav'
import BrowserRouter from 'react-router-dom'

class App extends Component {
  render() {
    const routes = (
      <BrowserRouter></BrowserRouter>
    );
    return (
      <div>
        <Nav></Nav>
      </div>
    );
  }
}

export default App;
