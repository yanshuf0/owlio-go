import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import './nav.css';
import axios from 'axios';

export default class NavComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      position: '0rem',
      showModal: false,
      username: '',
      password: ''
    };
  }

  slide = () => {
    this.setState({
      position: this.state.position === '0rem' ? '-12rem' : '0rem'
    });
  };

  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  };

  passChange = event => {
    this.setState({ password: event.target.value });
  };

  userChange = event => {
    console.log(event.target.value);
    this.setState({ username: event.target.value });
  };

  submit = async () => {
    try {
      const res = await axios.post('http://localhost:4321/api/signup', {
        username: this.state.username,
        password: this.state.password
      });
    } catch (e) {
      console.error(e);
    } finally {
      this.toggleModal();
    }
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark>
          <NavbarBrand
            onClick={this.toggleModal}
            style={{ color: 'white', cursor: 'pointer' }}
          >
            owlio.io
          </NavbarBrand>
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
            {this.state.position !== '0rem' && (
              <input id="searchInput" type="text" color="secondary" />
            )}
          </span>
        </Navbar>
        <Modal
          isOpen={this.state.showModal}
          toggle={this.toggleModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="e-mail"
                  value={this.state.username}
                  onChange={this.userChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="password placeholder"
                  value={this.state.password}
                  onChange={this.passChange}
                />
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.submit}>
              Submit
            </Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
