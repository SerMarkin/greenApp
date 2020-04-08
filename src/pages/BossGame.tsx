import React, { useState } from 'react';
import { connect } from '../data/connect';
import { IonPage, IonContent, IonCard, IonHeader, IonToolbar, IonTitle, IonCardHeader, IonCardContent, IonButton, IonIcon } from '@ionic/react';
import { MenuBtn } from '../components/menuBtn';
import './BossGame.scss';
import { RouteComponentProps } from 'react-router';
import { getScorePaper } from '../data/dataApi';
import { arrowForward } from 'ionicons/icons';
interface StateProps {
    username?: string;
  }
  
interface OwnProps extends RouteComponentProps {};

interface BossGameProps extends OwnProps, StateProps { };

const BossGame: React.FC<BossGameProps> = ({ history }) => {

    const [score,setScore] = useState("0")
    getScorePaper().then((resp)=>{
        if (!resp) return;
        setScore(resp);
        
    });
    const startApp = async () => {
        let t = Math.floor(+score / 100) 
        history.push('/bossgame/' + t);
      };
    


    return (
        <IonPage id="boss-page">
            <IonContent className="main-content">
                <MenuBtn  />
                <IonHeader>
                    <IonToolbar color="primary">
                    <IonTitle style={{"textAlign":"center"}}>Начни с малого</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonCard className="main-card">
                    <IonCardHeader className="main-header" >Успей спасти природные зоны пока не стало слишком поздно!</IonCardHeader>
                    <IonCardContent className="main-content">
                        <img src="assets/icon/cursor.png" alt="cursor" className="slide-image" /> 
                        <div>Сделай 100 кликов как можно быстрее, чтобы помочь убрать мусор
                        </div>
                        <IonButton fill="clear" onClick={startApp}>
                        Начать
                        <IonIcon slot="end" icon={arrowForward} />
                        </IonButton>
                    </IonCardContent>
                </IonCard> 
            </IonContent>
        </IonPage>
    )
}


export default connect<{}, {}, {}>({
    mapStateToProps: (state) => ({
    }),
    mapDispatchToProps: {
    },
    component: BossGame
})