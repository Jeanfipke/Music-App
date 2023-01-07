import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../Loading';

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
      <div data-testid="page-login">
        {
          isLoading ? <Loading />
            : (
              <>
                <p>TrybeTunes</p>
                <form>
                  <label htmlFor="name-input">
                    <input
                      id="name-input"
                      type="text"
                      placeholder="Insira seu nome"
                      data-testid="login-name-input"
                      onChange={ this.handleChangeName }
                      value={ login }
                    />
                    <button
                      type="button"
                      data-testid="login-submit-button"
                      disabled={ isButtonDisabled }
                      onClick={ async () => {
                        this.setState({ isLoading: true });
                        await createUser({ name: login });
                        history.push('/search');
                      } }
                    >
                      Entrar
                    </button>
                  </label>
                </form>
              </>
            )
        }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.string.isRequired,
};

export default Login;
