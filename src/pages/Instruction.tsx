import React, { useState } from 'react';
import { IonButton, IonIcon, IonContent, IonPage, IonCardHeader, IonCardContent, IonCard, useIonViewDidEnter} from '@ionic/react';
import './GamePage.scss';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { star } from 'ionicons/icons';
import { MenuBtn } from '../components/menuBtn';
import { getScorePaper } from '../data/dataApi';


interface MatchParams {
  id: string;
}

interface OwnProps extends RouteComponentProps<MatchParams> { }

interface CongratulationPageProps extends OwnProps { }

const Congratulation: React.FC<CongratulationPageProps> = ({ history, match }) => {
  
  const [i,setI] = useState(+match.params.id);
  const paper = [7,10.5,14,17.5,21,25.5,28,31.5,35,38.5,42,45.5,49,52.5,56];
  const plastic = [30,45,60,75,90,105,120,135,150,165,180,195,210,225,240];
  const [score,setScore] = useState(0);
  getScorePaper().then((resp)=>{
    if (!!resp){
      setScore(+resp)
    }
  })
  useIonViewDidEnter(()=>{
    if (match.params.id)
      setI(Math.min(+match.params.id,paper.length-1));
    else
      setI(0);
    if (i===0){
      setI(Math.min(Math.floor(score/100),paper.length))
    }
  })

    return (
      <IonPage id="game-page">
      <IonContent className="main-content">
        <MenuBtn  />
        <IonCard className="main-card" style={{margin:"30% 5%",padding:"5%",fontSize:"1.5rem"}}>
          <IonCardHeader>Ты отлично справился! </IonCardHeader>
          <IonCardContent>

          Для того чтоб получить подарок принеси {paper[i]} кг макулатуры или {plastic[i]}кг в ЦДМП КАИ (г. Казань ул. Карла Маркса д.10 каб 319) и покажи свой уникальный qr код. 
          </IonCardContent>
            <IonButton type="button" shape="round" onClick={()=>{history.push("/home")}}><IonIcon icon={star}></IonIcon></IonButton>
        </IonCard>
      </IonContent>
      </IonPage>
    );
  };

export default connect<{}, {}, {}>({
mapStateToProps: (state) => ({
}),
  component: Congratulation
})