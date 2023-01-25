import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import '../styles/profile.css';
import userPic from '../userPic.png';

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
              <div className="profile-page">
                <img
                  className="profile-pic"
                  data-testid="profile-image"
                  src={ image || userPic }
                  alt="Foto de perfil"
                  width="200px"
                />
                <div className="profile-content">
                  <h3>Nome</h3>
                  <p>{ name || 'Defina um nome' }</p>
                  <h3>Email</h3>
                  <p>{ email || 'Nenhum e-mail cadastrado' }</p>
                  <h3>Descrição</h3>
                  <p>{ description || 'Sem descrição' }</p>
                  <Link to="/profile/edit" className="edit-btn">Editar perfil</Link>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default Profile;
