import React {Component} from 'react';
import Logo from '../../../logo.svg';

class Login extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return(
      <div className="base-container">
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={logo} />
          </div>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Email</label>
              <input type="email" name="email" placeholder="email"
            </div>
          </div>
        </div>

      </div>
    )
  }
}

export default Login