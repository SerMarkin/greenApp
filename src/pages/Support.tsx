import React from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton } from '@ionic/react';
import './Login.scss';
import { connect } from '../data/connect';

interface OwnProps { }

interface DispatchProps { }

interface SupportProps extends OwnProps, DispatchProps { }

const Support: React.FC<SupportProps> = () => {
  return (
    <IonPage id="support-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>О нас</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/icon/main_tree.png" alt="logo" />
        </div>
        <p style={{"margin":"0 25px","textAlign":"center","lineHeight":"130%"}}>
        «ЭКО КАИ», проект, направленный на привлечение к проблеме сохранения экологии в г.Казани и обучение культуре раздельного сбора мусора. В течение года в рамках «ЭКО КАИ» проводятся обучающие лекции и мастер-классы на тему этичного образа жизни. За время существования проекта силами волонтеров удалось вывезти более 6 тонн вторсырья на завод переработки.И мы не планируем останавливаться на достигнутом!
        </p>
        
       <span style={{"color":"grey","position":"absolute","left":"0","bottom":"0"}}>https://icons8.ru/license</span>
       <span style={{"color":"grey","position":"absolute","right":"0","bottom":"0"}}>v.1.0.0</span>
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  component: Support
})