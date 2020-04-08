import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonList, IonItem, IonAlert } from '@ionic/react';
import './Account.scss';
import { setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
interface OwnProps extends RouteComponentProps { }

interface StateProps {
  username?: string;
}
export interface Photo {
  filepath: string;
  webviewPath?: string;
  base64?: string;
}
interface DispatchProps {
  setUsername: typeof setUsername;
}

interface AccountProps extends OwnProps, StateProps, DispatchProps { }

const Account: React.FC<AccountProps> = ({ setUsername, username }) => {

  const [showAlert, setShowAlert] = useState(false);
  return (
    <IonPage id="account-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Аккаунт</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {username &&
          (<div className="ion-padding-top ion-text-center">
            <img src="assets/icon/images.png" alt="avatar" />
            <h2>{ username }</h2>
            <IonList inset>
              {/* <IonItem onClick={() => clicked('Update Picture')}>Обновить фото</IonItem> */}
              <IonItem routerLink="/logout" routerDirection="none">Выйти</IonItem>
            </IonList>
          </div>)
        }
      </IonContent>
      <IonAlert
        isOpen={showAlert}
        header="Изменить логин"
        buttons={[
          'Отмена',
          {
            text: 'Ок',
            handler: (data) => {
              setUsername(data.username);
            }
          }
        ]}
        inputs={[
          {
            type: 'text',
            name: 'username',
            value: username,
            placeholder: 'логин'
          }
        ]}
        onDidDismiss={() => setShowAlert(false)}
      />
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    username: state.user.username
  }),
  mapDispatchToProps: {
    setUsername,
  },
  component: Account
})