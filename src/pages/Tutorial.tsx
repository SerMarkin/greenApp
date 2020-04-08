import React, { useState, useRef } from 'react';
import { IonContent, IonPage, IonToolbar, IonButtons, IonButton, IonSlides, IonSlide, IonIcon, IonItem } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import { setHasSeenTutorial } from '../data/user/user.actions';
import './Tutorial.scss';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {};

interface DispatchProps {
  setHasSeenTutorial: typeof setHasSeenTutorial
}

interface TutorialProps extends OwnProps, DispatchProps { };

const Tutorial: React.FC<TutorialProps> = ({ history, setHasSeenTutorial }) => {
  const [showSkip, setShowSkip] = useState(true);
  const slideRef = useRef<HTMLIonSlidesElement>(null);
  
  const startApp = async () => { 
    await setHasSeenTutorial(true);
    setTimeout(()=>{
      history.push('/game');
      slideRef.current!.slideTo(0);
    },200)
  };

  const handleSlideChangeStart = () => { 
    slideRef.current!.isEnd().then(isEnd => setShowSkip(!isEnd));
  };

  const handleSlideNext = ()=> {
    slideRef.current!.slideNext();
  }

  return (
    <IonPage id="tutorial-page">
        <IonToolbar>
          <IonButtons slot="end">
            {showSkip && <IonButton color='primary' onClick={startApp}>Skip</IonButton>}
          </IonButtons>
        </IonToolbar>
      <IonContent fullscreen>

        <IonSlides ref={slideRef} onIonSlideWillChange={handleSlideChangeStart} pager={false}>
          <IonSlide>
            <img src="assets/icon/main_tree.png" alt="" className="slide-image" />
            <h2 className="slide-title">
              Добро пожаловать ! <b></b>
            </h2>
            <p style={{color:"#000000"}}>
            Центр Добровольчества и Молодежных Проектов всегда принимает макулатуру, жестяные банки, полиэтилен, ПЭТ бутылки и батарейки.
            </p>
            <IonButton fill="clear" onClick={handleSlideNext}>
              Далее
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </IonSlide>

          <IonSlide>
            <img src="assets/icon/main_tree.png" alt="" className="slide-image" />
            <h2 className="slide-title">Правила приема вторсырья</h2>
             <h3 style={{color:"green"}}>Принимаем</h3> 
            <IonItem lines="none" style={{color:"#000000",textAlign:"center"}}>
            МАКУЛАТУРА: газеты, листы А4, тетради, книги, картон
            <br/><br/>
            ПЛАСТИК: пластиковые бутылки, жестяные банки (необходимо смять) , полиэтилен (плотная пленка от упаковки кассеты бутылок банок) 
            </IonItem>
             <h3 style={{color:"red"}}>НЕ принимаются</h3> 
            <IonItem lines="none" style={{color:"#000000"}}>
             чеки, флаеры, глянцевые, лакированные обложки,бутылки от кисломолочной продукции и т.д.
            </IonItem>
            <IonButton fill="clear" onClick={handleSlideNext}>
              Далее
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </IonSlide>

          <IonSlide>
            {/* <img src="assets/icon/main_tree.png" alt="" className="slide-image" /> */}
            <h2 className="slide-title">Задача проста: Сортируешь мусор- спасаешь деревья!</h2>
            <IonItem lines="none" style={{color:"#000000"}}>
            <img src="assets/gameicon/plastictrash.png" alt="plastic" className="slide-image" /> 
            Желтая корзина – пластик. 
            </IonItem>
            <IonItem lines="none" style={{color:"#000000"}}>
            <img src="assets/gameicon/papertrash.png" alt="plastic" className="slide-image" /> 
            Синяя корзина – бумага.
            </IonItem>
            <IonItem lines="none" style={{color:"#000000"}}>
            <img src="assets/gameicon/trash.png" alt="plastic" className="slide-image" /> 
            Черная корзина –прочие отходы.
            </IonItem>
            <IonButton fill="clear" onClick={handleSlideNext}>
              Далее
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </IonSlide>

          <IonSlide>
            <img src="assets/icon/main_tree.png" alt="" className="slide-image" />
            <h2 className="slide-title">Выбирай режим игры,</h2>
            <h2 className="slide-title"> побеждай монстра </h2>
            <h2 className="slide-title"> и получай подарки!</h2>
            <IonButton fill="clear" onClick={startApp}>
              Начать
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: ({
    setHasSeenTutorial
  }),
  component: Tutorial
});