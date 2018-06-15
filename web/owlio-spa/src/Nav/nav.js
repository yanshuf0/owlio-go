import React from 'react';
import ReactDOM from 'react-dom';
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
import { ToastContainer, toast } from 'react-toastify';

export default class NavComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      position: '0rem',
      showModal: false,
      email: '',
      username: '',
      password: '',
      signup: false,
      signedIn: false
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
    this.setState({ username: event.target.value });
  };

  emailChange = event => {
    this.setState({ email: event.target.value });
  };

  signupToggle = () => {
    this.setState({ signup: !this.state.signup });
  };

  focusInput = (component) => {
    if (component) {
        ReactDOM.findDOMNode(component).focus(); 
    }
}

  submit = async () => {
    if (this.state.signup) {
      try {
        const res = await axios.post('http://localhost:4321/api/signup', {
          username: this.state.username,
          password: this.state.password
        });
        this.toggleModal();
        toast.success('Successfully signed up!');
      } catch (e) {
        toast.error(
          e.response.data.error.charAt(0).toUpperCase() +
            e.response.data.error.substr(1) +
            '.'
        );
      }
    } else {
      try {
        const res = await axios.post('http://localhost:4321/api/signin', {
          username: this.state.username,
          password: this.state.password
        });
        this.toggleModal();
        toast.success('Successfully logged in!');
      } catch (e) {
        toast.error(
          e.response.data.error.charAt(0).toUpperCase() +
            e.response.data.error.substr(1) +
            '.'
        );
      }
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
              <input ref={this.focusInput} id="searchInput" type="text" color="secondary" onBlur={this.slide} />
            )}
          </span>
        </Navbar>
        <Modal
          isOpen={this.state.showModal}
          toggle={this.toggleModal}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle} className="theme-coloring">
            {this.state.signup ? 'Signup' : 'Login'}
          </ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <Label for="exampleEmail">
                  {this.state.signup ? 'Username/Email' : 'Username'}
                </Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder={
                    this.state.signup ? 'username/email' : 'username'
                  }
                  value={this.state.username}
                  onChange={this.userChange}
                />
              </FormGroup>
              {this.state.signup && (
                <FormGroup>
                  <Label for="exampleEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="e-mail"
                    value={this.state.email}
                    onChange={this.emailChange}
                  />
                </FormGroup>
              )}
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="password"
                  value={this.state.password}
                  onChange={this.passChange}
                />
              </FormGroup>
              <a
                onClick={this.signupToggle}
                style={{ color: 'blue', cursor: 'pointer' }}
              >
                {this.state.signup ? '(login)' : '(signup)'}
              </a>
            </Form>
          </ModalBody>
          <ModalFooter class="theme-coloring">
            <Button color="primary" onClick={this.submit}>
              {this.state.signup ? 'Signup' : 'Login'}
            </Button>{' '}
            <Button color="secondary" onClick={this.toggleModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <ToastContainer />
      </div>
    );
  }
}
