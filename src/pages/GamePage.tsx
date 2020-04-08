import React, { useState } from 'react';
import {  IonButton, IonIcon, IonContent, IonPage, IonItem, IonCardContent, IonCard, IonHeader, IonToolbar,  IonTitle, IonLabel, useIonViewDidEnter } from '@ionic/react';
import './GamePage.scss';
import { setUsername, setHasSeenTutorial } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { alarm, leaf } from 'ionicons/icons';
import { MenuBtn } from '../components/menuBtn';
import { getHasSeenTutorialData, getScorePaper } from '../data/dataApi';
interface OwnProps extends RouteComponentProps { }

interface StateProps {
  username?: string;
  scorePaper:number
  hasSeenTutorial: boolean;
}

interface DispatchProps {
  setUsername: typeof setUsername;
  setHasSeenTutorial: typeof setHasSeenTutorial;
}

interface GamePageProps extends OwnProps, StateProps, DispatchProps { }

const GamePage: React.FC<GamePageProps> = ({ history,scorePaper }) => {
  const toGameTime = ()=>{
    history.push("playGame?time");
  }

  const toGameCnt = ()=>{
    history.push("playGame?cnt");
  }

  const toGameBoss = ()=>{
    history.push("boss");
  }
  const [score,setScore] = useState(0);
  useIonViewDidEnter(()=>{
    getHasSeenTutorialData().then((resp)=>{
      if (!!resp && !!resp.value && resp.value==='false'){
        history.push("tutorial")
      }
    })
    getScorePaper().then((resp)=>{
      if (!!resp){
        setScore(+resp)
      }
    })
    }
  )


    return (
      <IonPage id="game-page">
      <IonContent className="main-content">
          <MenuBtn />
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>Выбери игру</IonTitle>
              <IonButton className="info-button"  shape="round" size="small" onClick={() => history.push("tutorial")}>
                ?
              </IonButton>
            </IonToolbar>
          </IonHeader>
          <IonCard  onClick={score>100?toGameBoss:()=>{}}>
            <IonItem  color={score>100?"primary":"medium"} >
              <IonLabel>Босс {score<=100?"(доступно после 100 деревьев)":""}</IonLabel>
            </IonItem>
          </IonCard>
          <IonCard className="choose-type" onClick={toGameCnt}>
            <IonItem  color="primary" >
              <IonLabel>На количество</IonLabel>
            </IonItem>
            <IonCardContent style={{"fontSize":"4rem"}}>
              +1
              <IonIcon icon={leaf} ></IonIcon>
            </IonCardContent>
          </IonCard>
          <IonCard className="choose-type" onClick={toGameTime}>
            <IonItem color="primary" >
              <IonLabel>На время</IonLabel>
            </IonItem>
            <IonCardContent style={{"fontSize":"4rem"}}>
              <IonIcon icon={alarm} ></IonIcon>
            </IonCardContent>
          </IonCard>
          
      </IonContent>
      </IonPage>
    );
  };

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    username: state.user.username,
    scorePaper: state.user.scorePaper,
    hasSeenTutorial: state.user.hasSeenTutorial
  }),
  mapDispatchToProps: {
    setUsername,
    setHasSeenTutorial
  },
  component: GamePage
})