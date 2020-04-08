import {
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonAvatar
} from '@ionic/react';
import QRcode from 'qrcode.react';
import { calendar, help,  logIn,  map, person, gift } from 'ionicons/icons';
import React, { useState } from 'react';
import { connect } from '../data/connect';
import { RouteComponentProps, withRouter } from 'react-router';
import { setDarkMode } from '../data/user/user.actions';
import '../theme/Menu.css';

const routes = {
  appPages: [
    { title: 'Статус пользователя', path: '/home', icon: calendar },
    { title: 'Задания', path: '/game', icon: map },
  ],
  loggedInPages: [
    { title: 'Аккаунт', path: '/account', icon: person },
    { title: 'Как получить подарок', path: '/instruction/0', icon: gift },
    { title: 'О нас', path: '/support', icon: help },
  ],
  loggedOutPages: [
    { title: 'Войти', path: '/login', icon: logIn },
    { title: 'О нас', path: '/support', icon: help },
  ]
};

interface Pages {
  title: string,
  path: string,
  icon: { ios: string, md: string },
  routerDirection?: string
}
interface StateProps {
  darkMode: boolean;
  swipeMode: boolean;
  isAuthenticated: boolean;
}
interface OwnProps extends RouteComponentProps { }
interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

interface MenuProps extends RouteComponentProps, StateProps, DispatchProps,OwnProps { }

const Menu: React.FC<MenuProps> = ({  isAuthenticated,swipeMode,history }) => {
  const [disableMenu] = useState(false);
  const toQr = ()=>{
    history.push("/qrcode")
  }
  function renderlistItems(list: Pages[]) {
    return list
      .filter(route => !!route.path)
      .map(p => (
        <IonMenuToggle key={p.title} auto-hide="false">
          <IonItem className="item" color="white"  button routerLink={p.path} routerDirection="none">
            <IonLabel>{p.title}</IonLabel>
          </IonItem>
        </IonMenuToggle>
      ));
  }

  return (
    <IonMenu type="overlay" swipeGesture={swipeMode} disabled={disableMenu} contentId="main">
      
      <IonContent class="outer-content" className="app" color="linear-gradient(0deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);">
      <IonItem className="first-panel item" lines="none" color="white" >
        <div  className="avatar-div">
          <IonAvatar   className="avatar">
          <img src="assets/icon/images.png" alt="pictUser" />
          </IonAvatar>
        </div>
        <div  className="avatar-div" style={{height:"50px",width:"50px"}}>
          <IonAvatar   className="avatar">

          <IonMenuToggle auto-hide="false">
          <QRcode value="192derev" onClick={toQr} style={{height:"100%",width:"100%"}}/>
          </IonMenuToggle>
          </IonAvatar>
        </div>
      </IonItem>
        
        {isAuthenticated?<IonList className="item">
          {renderlistItems(routes.appPages)}
        </IonList>:""}
        <IonList className="item">
          {isAuthenticated ? renderlistItems(routes.loggedInPages) : renderlistItems(routes.loggedOutPages)}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default connect<{}, StateProps, {}>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    isAuthenticated: state.user.isLoggedin,
    swipeMode: state.user.swipeMode,
  }),
  mapDispatchToProps: ({
    setDarkMode
  }),
  component: withRouter(Menu)
})
