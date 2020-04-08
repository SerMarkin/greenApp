
import React, { useState, createRef } from 'react';
import { IonPage, IonImg, useIonViewWillLeave, useIonViewWillEnter} from '@ionic/react';
import { connect } from '../data/connect';
import './PlayGame.scss';
import ScoreTable from '../components/ScoreTable';
import { RouteComponentProps } from 'react-router';
import { setSwipeMode } from '../data/user/user.actions';

interface DispatchProps {
    setSwipeMode: typeof setSwipeMode
}

interface OwnProps extends RouteComponentProps ,DispatchProps {}


const PlayGame : React.FC<OwnProps> = ({ history, location, match,setSwipeMode }) => {
    const [score,setScore] = useState(0);
    const [typeGame,setTypeGame] = useState(location.search.slice(1));
    useIonViewWillEnter(()=>{
        setScore(0);
        setTypeGame(window.location.search.slice(1));
        setSwipeMode(false);
        console.log("enter");
    })
    useIonViewWillLeave(()=>{
        setSwipeMode(true);
        console.log("leave");
    })
    const urns = [
        {
            src:"assets/gameicon/plastictrash.png",
            ref:createRef<HTMLIonImgElement>(),
            type:"plastic",
        },
        {
            src:"assets/gameicon/papertrash.png",
            ref:createRef<HTMLIonImgElement>(),
            type:"paper",
        },
        {
            src:"assets/gameicon/trash.png",
            ref:createRef<HTMLIonImgElement>(),
            type:"mix",
        },
    ]
    const publicUrl = "assets/gameicon/things/";
    const plastic = ["plastic1.svg","plastic2.png"];
    const paper = ["paper1.png","paper2.svg","paper3.png"];
    const mix = ["mix1.svg","mix2.png","mix3.png"];
    const allThings = plastic.concat(paper).concat(mix);
    const chooseNewThing = (str:string|null)=>{
        const tmp = allThings.filter((s)=>s!==str);
        return tmp[Math.floor(tmp.length * Math.random())]
    }

    const ondrag = (e:React.TouchEvent)=>{
        e.stopPropagation();
        e.preventDefault();

    }

    const move = (e:React.TouchEvent)=>{
        e.stopPropagation();
        e.preventDefault();
        const t = document.getElementById("trash");
        if (!t) return;
        const w = t.offsetWidth;
        const h = t.offsetHeight;
        t.style.left = e.nativeEvent.touches[0].pageX -w/2 + "px"
        t.style.top = e.nativeEvent.touches[0].pageY -h/2 + "px"
    }          
    
    const end = (e:React.TouchEvent)=>{
        if (!e.nativeEvent || !e.nativeEvent.changedTouches || e.nativeEvent.changedTouches.length===0 ) return;
        const t = document.getElementById("trash");
        const c = document.getElementById("container");
        const [curTouchX,curTouchY] = [e.nativeEvent.changedTouches[0].clientX,e.nativeEvent.changedTouches[0].clientY];
        if (!t) return;
        
        var flag = false;
        var urnFound = null;
        const child = t.children[0];
        const src = child.getAttribute("src");
        if (!src) return;
        const srcar = src.split("/");
        const typetrash = srcar[srcar.length-1];
        for (let i in urns){
            const urn = urns[i].ref.current;
            if (!c || !urn) return;
            const [left1,top1] = [ c.offsetLeft+ urn.offsetLeft,c.offsetTop + urn.clientTop];
            const [left2,top2] = [left1 + urn.offsetWidth,top1 + urn.offsetHeight];
            if (left1 <= curTouchX && left2 >= curTouchX && top1 <=curTouchY && (top2+100) >= curTouchY){
                if (typetrash.includes(urns[i].type)) {
                    flag = true;
                }
                urnFound = urn;
                break;
            }
            
        }
        const utnf = urnFound;
        if (flag && utnf){
            setScore(score+1);
            utnf.classList.add("green");
            setTimeout(()=>{
                utnf.classList.remove("green");
            },1000)
        }else if (utnf){
            utnf.classList.add("red");
            setScore(score-1);
            setTimeout(()=>{
                utnf.classList.remove("red");
            },1000)
        }
        t.style.display="none";
        child.setAttribute("src",publicUrl + chooseNewThing(typetrash));
        setTimeout(()=>{
            t.style.left = "40%";
            t.style.top = "80%";
            t.style.display="block";
        },200)
    }

    


    return (
        <IonPage id="play-game-page">
            <ScoreTable score={score} type={typeGame} history={history} location={location} match={match} />
            <div id="container" className="container">
                {
                    urns.map((p,i)=>(
                            <IonImg src={p.src} ref={p.ref} key={p.src + i} className="img-trash" />
                    ))
                }
            </div>

            <div id="trash" className="trash"  onTouchStart={ondrag} onTouchMove={move} onTouchEnd={end} draggable={true}>
            <IonImg src={publicUrl + chooseNewThing(null)} />
            </div>
        </IonPage>
    )
}


export default connect<{}, {}, {}>({
    mapDispatchToProps: {
        setSwipeMode
    },
    component: PlayGame
})