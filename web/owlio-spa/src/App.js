import React, { Component } from "react";
import NavComponent from "./Nav/nav";
import { BrowserRouter, Route } from "react-router-dom";
import DashComponent from "./Dash/dash";

class App extends Component {
  render() {
    const routes = (
      <BrowserRouter>
        <div>
          <Route path="/Nav" component={NavComponent} />
          <Route path="/" component={DashComponent} exact={true} />
        </div>
      </BrowserRouter>
    );
    return (
      <div>
        <NavComponent />
        {routes}
      </div>
    );
  }
}

export default App;
