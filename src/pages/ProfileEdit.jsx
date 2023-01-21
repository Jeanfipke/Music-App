import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import ProfileForm from './ProfileForm';
import '../styles/profileEdit.css';

class ProfileEdit extends Component {
  state = {
    userInfo: {},
    isLoading: false,
  };

  componentDidMount() {
    this.saveUserInState();
  }

  saveUserInState = async () => {
    this.setState({
      isLoading: true,
    }, async () => {
      const userInfo = await getUser();
      this.setState({
        userInfo,
        isLoading: false,
      });
    });
  };

  render() {
    const { isLoading, userInfo } = this.state;
    const { history } = this.props;
    return (
      <div className="profile-background" data-testid="page-profile-edit">
        <Header />
        <div className="profile-main-content">
          {
            isLoading ? (
              <Loading />
            ) : (
              <ProfileForm
                history={ history }
                userInfo={ userInfo }
                className="profile-content"
              />
            )
          }
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({}).isRequired,
};

export default ProfileEdit;
