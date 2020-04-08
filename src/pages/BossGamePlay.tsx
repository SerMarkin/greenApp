import React, { useState } from 'react';
import { connect } from '../data/connect';
import { IonPage, IonContent, IonCard, IonHeader, IonToolbar, IonTitle,  useIonViewDidEnter, IonLoading } from '@ionic/react';
import { MenuBtn } from '../components/menuBtn';
import './BossGame.scss';
import { RouteComponentProps } from 'react-router';

interface StateProps {
    username?: string;
  }
  

interface MatchParams {
    id: string;
  }
  
interface OwnProps extends RouteComponentProps<MatchParams> {};

interface BossGameProps extends OwnProps, StateProps { };

const BossGamePlay: React.FC<BossGameProps> = ({ history,  match }) => {

    const src = "assets/gameicon/boss/"
    const src_trash = ["moregrey.png","parkgrey.png","beach.png","tc.png","super.png","street2.png","street.png","snow.png","poezd.png","ploschadka1.png","play.png","parking1.png","part31.png","park21.png","les.png"];
    const src_clear = ["more1.png","park1.png","beach1.jpg","tc1.png","super2.png","street3.png","street1.png","snow1.png","poezd2.png","ploschadka.png","play1.png","parking0.png","park30.png","park2.png","les_2.png"];
    const texts = ["Начнём!","Хороший старт!","Прекрасно!","Ещё немного!"]
    const i = Math.min(+match.params.id,src_clear.length-1);
    const goalNumber = 100;
    const [clicks,setClick] = useState(0);
    const [goal,setGoal] = useState(goalNumber);
    const [showLoading,setShowLoading] = useState(false);
    const clickImg = (e:React.MouseEvent)=>{
        setClick(clicks+1);
        if (clicks>goal){
            history.push("/instruction/"+i);
        }
    }


    useIonViewDidEnter(()=>{
        setClick(0);
        setGoal(goal);
    })
    

    return (
        <IonPage id="boss-page">
            <IonContent className="main-content">
                <MenuBtn  />
                <IonHeader>
                    <IonToolbar color="primary">
                    <IonTitle style={{"textAlign":"center"}}>Действуй</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Please wait...'}
        duration={5000}
      />
                <IonCard className="main-card">
                    <div>{clicks}</div>
                    <img src={src+src_clear[i]} className="img-game" style={{"opacity":clicks>100?1:clicks**2/goal**2}} alt="zone1" onClick={clickImg}/>
                    <img src={src+src_trash[i]} className="img-game" style={{"opacity":clicks>100?0:1-clicks**2/goal**2}} alt="zone" onClick={clickImg}/>
                    <div style={{position:"absolute",bottom:"40px",width:"90%"}}>{texts[Math.floor(clicks/25)]}</div>
                </IonCard>
            </IonContent>
        </IonPage>
    )
}


export default connect<{}, {}, {}>({
    mapStateToProps: () => ({
    }),
    mapDispatchToProps: {
    },
    component: BossGamePlay
})