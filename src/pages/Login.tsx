import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonCard, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    if(username && password) {
      await setIsLoggedIn(true);
      await setUsernameAction(username);
      history.push('/home', {direction: 'none'});
    }
  };

  return (
    <IonPage id="login-page" >
      {/* <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader> */}
      <IonContent style={{ "--background": "#0cd1e8"}}>

      <IonCard class="loginContent" >
        <div className="login-logo">
          <img src="assets/icon/main_icon.png" alt="logo" />
        </div>

        <form noValidate onSubmit={login}>
          <IonList>
              {/* <IonLabel position="fixed" color="primary">Логин</IonLabel> */}
            <IonItem>
              <IonInput name="username" type="text" value={username} placeholder="Логин" spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            

            <br></br>
            {/* <IonLabel position="stacked" color="primary">Пароль</IonLabel> */}
            <IonItem>
              <IonInput name="password" type="password" placeholder="Пароль" value={password} onIonChange={e => setPassword(e.detail.value!)}>
              </IonInput>
            </IonItem>
            {/* {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Введите пароль
              </p>
            </IonText>} */}
          </IonList>
            <br></br>
          {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Неверный логин или пароль
              </p>
            </IonText>}
          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Войти</IonButton>
            </IonCol>
            <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Регистрация</IonButton>
            </IonCol>
          </IonRow>
        </form>
        </IonCard>
      </IonContent>

    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Login
})