import React, { useState } from 'react';
import { IonCard, IonContent, IonPage,IonCardHeader, useIonViewWillEnter } from '@ionic/react';
import './Home.scss';
import { setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import ShareSocialFab from '../components/ShareSocialFab';
import { MenuBtn } from '../components/menuBtn';
import { getScorePaper } from '../data/dataApi';

interface OwnProps extends RouteComponentProps { }

interface StateProps {
  username?: string;
}

interface DispatchProps {
  setUsername: typeof setUsername;
}

interface HomeProps extends OwnProps, StateProps, DispatchProps { }

const Home: React.FC<HomeProps> = ({  username,history }) => {
  const [score,setScore] = useState("0")
  const [state] = useState(0)
  getScorePaper().then((resp)=>{
      if (!resp) return;
      setScore(resp);
      
  });


  const paper = ["Бумажный лох","Человек со стаканчиком из Старбакса","Хранитель конспектов","Любитель чеков из пятёрочки",
    "Противник черновиков","Уничтожитель курсачей","Образцовый октябрёнок","Экоактивист","Защитник деревьев", "Спаситель амазонских лесов",
    "Адекватная Грета Тунберг", "Ученик Малфуриона", "Правильный Урфин Джюс", "Напарник Радагаста","Друг Артемиды"  ]

  const plastic = [
    "Пластиковая бяка", "Пользователь одноразовой посуды", "Собиратель крышечек для акции", "Любитель пакета с пакетами", 
"Носитель тапочек из бутылок", "Любитель полторашек", "Сдал стеклопакет на переработку", "Убийца бутылок",
"Сторонник zerowaste", "Мастер переработки", "Защитник природы", "Спаситель мирового океана", "Работник Джона Хайата", 
"Понимающий Григорий Петров", "Дальновидный Александр Паркс", "Победитель пластмассового мира"  ]

const cards = [
  {label:"Бумага",data:paper,img:"assets/img/icons-status-paper.png"},
  {label:"Пластик",data:plastic,img:"assets/img/icons8-status-plastic.png"},
]
  useIonViewWillEnter(()=>{
    if (!username || username===""){
      history.push("/signup")
    }
  })

  const floor = (s:string)=>{
    return Math.max(Math.floor(+s/100),0);
  }
  return (
    <IonPage id="home-page">
      <IonContent className="main-content">
        <MenuBtn  />
        <IonCard className="main-card">
        <IonCardHeader >
            Всего спасено {+score===0?0:score} 
        </IonCardHeader>
        </IonCard>
        <IonCard className="main-card" id="ssf1">
            <IonCardHeader>
            {cards[state].label}
            </IonCardHeader>
              <div id="img12" className="img-logo">
              <img src={cards[state].img} alt="logo" />
              </div>
            {cards[state].data[floor(score)]}
            <ShareSocialFab  name={cards[state].data[floor(score)]} id={2} />
        </IonCard>
         <IonCard className="main-card" id="ssf2">
            <IonCardHeader>
            Пластик
            </IonCardHeader>
              <div className="img-logo">
              <img src="assets/img/icons8-status-plastic.png" alt="logo" />
              </div>
            {plastic[floor(score)]}
          <ShareSocialFab name={plastic[floor(score)]} id={7349429} />
        </IonCard> 
      </IonContent>
    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    username: state.user.username
  }),
  mapDispatchToProps: {
    setUsername,
  },
  component: Home
})