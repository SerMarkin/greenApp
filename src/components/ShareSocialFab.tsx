
import { IonLoading, IonFab, IonFabButton, IonIcon, IonFabList } from "@ionic/react"
import { share } from "ionicons/icons"
import React, { useState } from "react"
import { VKShareButton,VKIcon } from 'react-share';
interface OwnProps {
  name: string,
  id:number,
}
const ShareSocialFab: React.FC<OwnProps> = ({name,id}) => {
  const [loadingMessage, setLoadingMessage] = useState('')
  const [showLoading, setShowLoading] = useState(false);
  const openSocial = (network: string) => { 
    setLoadingMessage(`Posting to ${network}`);
    setShowLoading(true);
  };
  const shareOptions= {url: "http://play.google.com/store/apps/details?id=eco.kai",title: "Теперь я мастерски сортирую мусор, Я "+name+" , присоединяйся!",
    image:"https://sun9-45.userapi.com/c857120/v857120707/1016ea/EQ7C9FOpm0M.jpg"};
  
  return(
    <>
      <IonLoading
        isOpen={showLoading}
        message={loadingMessage}
        duration={2000}
        spinner="crescent"
        onDidDismiss={() => setShowLoading(false)}
      />
      <IonFab slot="fixed" vertical="bottom" horizontal="end">
        <IonFabButton>
          <IonIcon icon={share} />
        </IonFabButton>
        <IonFabList side="top">
          <IonFabButton color="facebook" onClick={() => openSocial('Vk')}>
            <VKShareButton children={(<VKIcon size={44 } round crossOrigin="*" />)}
             translate={"no"} url={shareOptions.url} image={shareOptions.image} 
             title={shareOptions.title}
             
             />
            {/* </VKShareButton> */}
          </IonFabButton>
          
        </IonFabList>
      </IonFab>
    </>
  )
};

export default ShareSocialFab;