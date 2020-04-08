import React, { useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane, useIonViewDidEnter } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { connect } from './data/connect';
import { AppContextProvider } from './data/AppContext';
import { loadConfData } from './data/sessions/sessions.actions';
import { setIsLoggedIn, setUsername, loadUserData } from './data/user/user.actions';
import Account from './pages/Account';
import Signup from './pages/Signup';
import Support from './pages/Support';
import Tutorial from './pages/Tutorial';
import GameOrTutorial from './components/GameOrTutorial';
import { Session } from "./models/Session";
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import PlayGame from './pages/PlayGame';
import Congratulation from './pages/Congratulation';
import VK  from 'react-vk';
import BossGame from './pages/BossGame';
import BossGamePlay from './pages/BossGamePlay';
import Instruction from './pages/Instruction';
import Qrcode from './pages/Qrcode';

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  darkMode: boolean,
  sessions: Session[],
}

interface DispatchProps {
  loadConfData: typeof loadConfData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface IonicAppProps extends StateProps, DispatchProps { }

const IonicApp: React.FC<IonicAppProps> = ({ darkMode, sessions, setIsLoggedIn, setUsername, loadConfData, loadUserData }) => {

  useEffect(() => {
    loadUserData();
    loadConfData();
    // eslint-disable-next-line
  }, []);

  // try{
  //   window.screen.orientation.lock("portrait").then(resp=>{
  //     console.log(resp)
  //   });
  // }catch(e){
  //   console.log(e)
  // }
  useIonViewDidEnter(()=>{
    try{
    window.screen.orientation.lock("portrait").then(resp=>{
      console.log(resp)
    });
  }catch(e){
    console.log(e)
  }
  })
  
  return (
    sessions.length === 0 ? (
      <div></div>
    ) : (
        <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
          <VK apiId={12345} />
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                <Route path="/home" component={Home} />
                <Route path="/account" component={Account} />
                <Route path="/signup" component={Signup} />
                <Route path="/support" component={Support} />
                <Route path="/tutorial" component={Tutorial} />
                <Route path="/boss" component={BossGame} />
                <Route path="/bossgame/:id" component={BossGamePlay} />
                <Route path="/instruction/:id" component={Instruction} />
                <Route path="/gameOrTutorial" component={GameOrTutorial} />
                <Route path="/game" component={GamePage} />
                <Route path="/playGame" component={PlayGame} />
                <Route path="/congratyou" component={Congratulation} />
                <Route path="/qrcode" component={Qrcode} />
                <Route path="/logout" render={() => {
                  setIsLoggedIn(false);
                  setUsername(undefined);
                  return <Redirect to="/signup" />
                }} />
                <Route path="/" component={Home} exact />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      )
  )
}

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    sessions: state.data.sessions
  }),
  mapDispatchToProps: { loadConfData, loadUserData, setIsLoggedIn, setUsername },
  component: IonicApp
});
