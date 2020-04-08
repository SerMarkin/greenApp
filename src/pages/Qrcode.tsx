import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, useIonViewDidEnter } from '@ionic/react';
import './Login.scss';
import { connect } from '../data/connect';
import QRcode from 'qrcode.react';
import { getScorePaper } from '../data/dataApi';


interface StateProps {
  username?: string;
}
interface DispatchProps { }

interface SupportProps extends StateProps, DispatchProps { }

const Qrcode: React.FC<SupportProps> = ({username}) => {

  const [score,setScore] = useState(0);
  useIonViewDidEnter(()=>{
    getScorePaper().then((resp)=>{
      if (!!resp){
        setScore(+resp)
      }
    })
    }
  )


  return (
    <IonPage id="support-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>QRcode</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

      <QRcode value={username?(username +" Кол-во очков"+ score):score+""} style={{height:"100vw",width:"100vw",margin:"100px 0"}}/>
      </IonContent>
    </IonPage>
  );
};


export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    username: state.user.username,
    scorePaper: state.user.scorePaper,
  }),
  mapDispatchToProps: {
    
  },
  component: Qrcode
})