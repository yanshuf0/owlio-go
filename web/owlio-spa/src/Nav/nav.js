import React from "react";
import { Navbar, NavbarBrand } from "reactstrap";
import "./nav.css";

export default class NavComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      position: "0em"
    };
  }

  slide = () => {
    this.setState({
      position: this.state.position === "0em" ? "-12em" : "0em"
    });
  };

  render() {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">owlio.io</NavbarBrand>
        <span className="filler" />
        <span onClick={this.slide}>
          <svg
            style={{ transform: `translate(${this.state.position})` }}
            id="circle"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z"
            />
          </svg>
        </span>
        <span id="searchSpan">
          {this.state.position !== "0em" && (
            <input id="searchInput" type="text" color="secondary"/>
          )}
        </span>
      </Navbar>
    );
  }
}