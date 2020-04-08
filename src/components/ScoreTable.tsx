import React, { Component } from 'react'; // let's also import Component

import { RouteComponentProps } from 'react-router';
import { setScorePaperN } from '../data/user/user.actions';
import { Plugins } from '@capacitor/core';
import { withIonLifeCycle, IonCard } from '@ionic/react';  
const { Storage } = Plugins;
// the clock's state has one field: The current time, based upon the
// JavaScript class Date
// interface OwnProps extends RouteComponentProps,PropsS {}


type ClockState = {
  timer: number,
  count: number,
  intTimer: NodeJS.Timeout
}
type PropsS  ={
    score:number,
    type:string,
}

interface OwnProps extends RouteComponentProps,PropsS {}
const cnt = 10;
class Clock  extends Component<OwnProps, ClockState> {
  
  ionViewWillEnter() {
    this.setState({
      timer:10,
      count:cnt,
    });
   
  }

  componentDidUpdate(prevProp:OwnProps){
    if (prevProp.score<this.props.score){
      this.setState({
        timer:this.state.timer+1,
        count:this.state.count- Math.abs(prevProp.score-this.props.score),
      });
    }
    if (prevProp.score!==this.props.score && Math.abs(prevProp.score-this.props.score)<=1){
      console.log(prevProp.score,this.props.score,this.state.count)
      this.setState({
        count:this.state.count- Math.abs(prevProp.score-this.props.score),
      });
    }
  }


  tick() {
    this.setState({
      timer:this.state.timer-1 ,
    });
    if ((this.props.type==="time" && this.state.timer===0) || (this.props.type==="cnt" && this.state.count===0)){

        Storage.get({ key: "scorePaper" }).then((resp)=>{
            if (!resp || resp.value==="NaN") setScorePaperN(this.props.score);
            else if (!!resp && !!resp.value) setScorePaperN(this.props.score + (+resp.value));
            this.props.history.push("congratyou?"+this.props.score);
        });
        clearInterval(this.state.intTimer);
    }
  }
  ionViewDidEnter() {
    this.setState({
      intTimer : (setInterval(() => this.tick(), 1000)),
    });
  }

  ionViewDidLeave() {
    clearInterval(this.state.intTimer);
  }

  render() {
    return (
      <>
      <IonCard style={{"height":"15%","padding":"4% 16%","fontSize":"1.5rem","color":"white","background":"darkseagreen"}}>
          
          {this.props.score} деревьев спасено
      <div style={{float:"right"}}>{(!!this.state?(this.props.type==="time"?this.state.timer+"c":this.state.count+" осталось"):0)}</div>
      </IonCard>
      </>
    );
  }
}

export default withIonLifeCycle(Clock);