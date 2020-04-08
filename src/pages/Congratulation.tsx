
import React from 'react';
import { IonButton, IonIcon, IonContent, IonPage, IonCardHeader, IonCardContent, IonCard} from '@ionic/react';
import './GamePage.scss';
import { setUsername, setHasSeenTutorial } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { star } from 'ionicons/icons';
import { MenuBtn } from '../components/menuBtn';
interface OwnProps extends RouteComponentProps { }

interface StateProps{
    scorePaper:number
}

interface DispatchProps {
  setUsername: typeof setUsername;
  setHasSeenTutorial: typeof setHasSeenTutorial;
}

interface CongratulationPageProps extends OwnProps, DispatchProps,StateProps { }

const Congratulation: React.FC<CongratulationPageProps> = ({  history }) => {
  
    return (
      <IonPage id="game-page">
      <IonContent className="main-content">
        <MenuBtn  />
        <IonCard className="main-card" style={{margin:"30% 5%",padding:"5%",fontSize:"2.5rem"}}>
          <IonCardHeader>Было спасено</IonCardHeader>
            <IonCardContent style={{fontSize:"2rem"}}>{window.location.search.slice(1)} деревьев</IonCardContent>
            <IonButton type="button" shape="round" onClick={()=>{history.push("/game")}}><IonIcon src="assets/icon/reload-sharp.svg" style={{color:"blue",}}></IonIcon></IonButton>
            <IonButton type="button" shape="round" onClick={()=>{history.push("/home")}}><IonIcon icon={star}></IonIcon></IonButton>
        </IonCard>
      </IonContent>
      </IonPage>
    );
  };

export default connect<{}, StateProps, {}>({
mapStateToProps: (state) => ({
    scorePaper: state.user.scorePaper,
}),
  component: Congratulation
})