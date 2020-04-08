import React from 'react';
import { IonButtons, IonMenuButton } from '@ionic/react';

export const MenuBtn: React.FC = () => (
  <>
    <IonButtons style={{position:"absolute",background: "#fefefe7d",borderRadius: "50px",margin:"5px"}}>
    <IonMenuButton></IonMenuButton>
    </IonButtons>
  </>
)
