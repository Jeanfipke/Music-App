import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../styles/login.css';
import logo from '../images/logo.svg';

class Login extends Component {
  state = {
    login: '',
    isButtonDisabled: true,
    isLoading: false,
  };

  handleChangeName = ({ target: { value } }) => {
    const tres = 3;
    if (value.length >= tres) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
    this.setState({
      login: value,
    });
  };

  render() {
    const { login, isButtonDisabled, isLoading } = this.state;
    const { history } = this.props;
    return (
      <div className="login-background">
        <div className="div-login" data-testid="page-login">
          {
            isLoading ? <Loading />
              : (
                <>
                  <img src={ logo } alt="logo trybe tunes" />
                  <form className="login-form">
                    <label htmlFor="name-input">
                      <input
                        id="name-input"
                        type="text"
                        placeholder="Qual é o seu nome?"
                        data-testid="login-name-input"
                        onChange={ this.handleChangeName }
                        value={ login }
                      />
                    </label>
                    <button
                      type="submit"
                      data-testid="login-submit-button"
                      disabled={ isButtonDisabled }
                      onClick={ async (event) => {
                        event.preventDefault();
                        this.setState({ isLoading: true });
                        await createUser({ name: login });
                        history.push('/search');
                      } }
                    >
                      ENTRAR
                    </button>
                  </form>
                </>
              )
          }
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
