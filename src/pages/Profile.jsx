import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../styles/profile.css';

class Profile extends Component {
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
      console.log(userInfo);
      this.setState({
        userInfo,
        isLoading: false,
      });
    });
  };

  render() {
    const { userInfo: { name, email, description, image }, isLoading } = this.state;
    return (
      <div className="profile-background" data-testid="page-profile">
        <Header />
        <div className="profile-main-content">
          {
            isLoading ? (
              <Loading />
            ) : (
              <div className="profile-content">
                <h3>Nome</h3>
                <p>{ name }</p>
                <h3>Email</h3>
                <p>{ email }</p>
                <h3>Descrição</h3>
                <p>{ description }</p>
                <img
                  data-testid="profile-image"
                  src={ image }
                  alt="Foto de perfil"
                  width="100px"
                />
                <Link to="/profile/edit">Editar perfil</Link>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Profile;
