import React, { Component } from "react";

class Register extends Component {

  constructor(props){
    super(props);
    this.state = {
      registerName: '',
      registerEmail: '',
      registerPassword: ''
    }
  }

  onNameChange = (event) => {
    this.setState({ registerName: event.target.value });
  }

  onEmailChange = (event) => {
    this.setState({ registerEmail: event.target.value });
  }

  onPasswordChange = (event) => {
    this.setState({ registerPassword: event.target.value });
  }

  onSubmitRegister = () => {
    fetch('https://sheltered-journey-89423.herokuapp.com/register', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.registerName,
        email: this.state.registerEmail,
        password: this.state.registerPassword
      })
    })
    .then(resp => resp.json())
    .then(user => {

      if(user.id){
        fetch(`https://sheltered-journey-89423.herokuapp.com/rank/${user.id}`)
        .then(res => res.json())
        .then(rank => {
          this.props.loadUser(user, rank);
          this.props.onRouteChange("home");
        })
      }
      
    })
  }

  render() {
    return (
      <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center relative">
        <main className="pa4 black-80 w-100">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  onChange={this.onNameChange}
                  type="text"
                  name="name"
                  id="name"
                />
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  onChange={this.onEmailChange}
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  onChange={this.onPasswordChange}
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitRegister}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
  
};

export default Register;
