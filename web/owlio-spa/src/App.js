import React, { Component } from 'react';
import NavComponent from './Nav/nav'
import {BrowserRouter, Route} from 'react-router-dom'
import DashComponent from './Dash/dash'

class App extends Component {
  render() {
    const routes = (
      <BrowserRouter>
        <Route path="/" component={DashComponent}></Route>
      </BrowserRouter>
    );
    return (
      <div>
        <NavComponent></NavComponent>
        {routes}
      </div>
    );
  }
}

export default App;
