import React, { useState } from 'react';
import {  IonCard, IonContent, IonPage, IonCardTitle,  IonRow, IonCol, IonButton, IonList, IonItem,  IonInput, IonText } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername, setHasSeenTutorial,setScorePaperN } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
  setHasSeenTutorial: typeof setHasSeenTutorial;
  setScorePaperN: typeof setScorePaperN;
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn,setHasSeenTutorial, history, setUsername: setUsernameAction,setScorePaperN}) => {

  const [username, setUsername] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(username) {
      await setIsLoggedIn(true);
      await setUsernameAction(username);
      await setHasSeenTutorial(false);
      await setScorePaperN(0);
      history.push('/account', {direction: 'none'});
    }
  };

  return (
    <IonPage id="signup-page">
      <IonContent style={{ "--background": "#0cd1e8"}}>

      <IonCard class="loginContent" >
        <IonCardTitle color="primary">Регистрация</IonCardTitle>
        <div className="login-logo">
          <img src="assets/icon/main_tree.png" alt="Ionic logo" />
        </div>
        <form noValidate onSubmit={login}>
          <IonList>
              {/* <IonLabel position="stacked" color="primary">Имя</IonLabel> */}
            <IonItem>
              <IonInput name="username" type="text" value={username} placeholder="Введите имя" spellCheck={false} autocapitalize="off" 
                onIonChange={e => {
                  setUsername(e.detail.value!);
                  setUsernameError(false);
                }}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p>
                Введите логин
              </p>
            </IonText>}
            
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block">Создать</IonButton>
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
    setUsername,
    setHasSeenTutorial,
    setScorePaperN,
  },
  component: Login
})