import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateUser } from '../services/userAPI';
import Loading from '../components/Loading';

class ProfileForm extends Component {
  state = {
    isLoading: false,
    isButtonDisabled: true,
    userName: '',
    email: '',
    description: '',
    image: '',
  };

  componentDidMount() {
    const { userInfo } = this.props;
    this.setState({
      userName: userInfo.name,
      email: userInfo.email,
      description: userInfo.description,
      image: userInfo.image,
    }, () => this.validateForm());
  }

  validateForm = () => {
    const {
      userName,
      email,
      description,
      image,
    } = this.state;
    if (
      userName.length >= 1
      && email.length >= 1
      && description.length >= 1
      && image.length >= 1
    ) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.validateForm();
    });
  };

  render() {
    const {
      isLoading,
      isButtonDisabled,
      userName,
      email,
      description,
      image,
    } = this.state;
    const { history } = this.props;
    return (
      <div>
        {
          isLoading ? (
            <Loading />
          ) : (
            <form>
              <input
                name="userName"
                type="text"
                value={ userName }
                data-testid="edit-input-name"
                onChange={ this.handleChange }
              />
              <input
                name="email"
                type="email"
                value={ email }
                data-testid="edit-input-email"
                onChange={ this.handleChange }
              />
              <input
                name="description"
                type="textarea"
                value={ description }
                data-testid="edit-input-description"
                onChange={ this.handleChange }
              />
              <input
                name="image"
                type="text"
                value={ image }
                data-testid="edit-input-image"
                onChange={ this.handleChange }
              />
              <button
                type="submit"
                disabled={ isButtonDisabled }
                onClick={ (event) => {
                  event.preventDefault();
                  this.setState({
                    isLoading: true,
                  }, async () => {
                    await updateUser({
                      name: userName,
                      email,
                      description,
                      image,
                    });
                    this.setState({ isLoading: false }, () => {
                      history.push('/profile');
                    });
                  });
                } }
                data-testid="edit-button-save"
              >
                Salvar
              </button>
            </form>
          )
        }
      </div>
    );
  }
}

ProfileForm.propTypes = {
  userInfo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileForm;
