import React from "react";
import { Navbar, NavbarBrand, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import "./nav.css";

export default class NavComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      position: "0em",
      showModal: false
    };
  }

  slide = () => {
    this.setState({
      position: this.state.position === "0em" ? "-11em" : "0em"
    });
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  render() {
    return (
      <div>
      <Navbar color="dark" dark>
        <NavbarBrand onClick={this.toggleModal} style={{color: 'white', cursor: 'pointer'}}>owlio.io</NavbarBrand>
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
      <Modal isOpen={this.state.showModal} toggle={this.toggleModal} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggleModal}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
