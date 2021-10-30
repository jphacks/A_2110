import zIndex from "@material-ui/core/styles/zIndex";
import { useStopwatch, useTimer } from "react-timer-hook";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { DependencyList, useCallback, useEffect, useRef, useState } from "react";
import Button from '@mui/material/Button';
import Header from "../../components/header";
import Link from "next/link";
import axios from "axios";
import router from "next/dist/client/router";
type Motion = {
  x: number,
  y: number,
  z: number,
}

function NumberTypeAdapter(x: null | undefined | number) : number{
  return x = x !== (null) ? (x !== (undefined) ? x : 0) : 0
}
//加速度取得ハンドラ


//ページ実装
const Track: NextPage = () => {
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
  useStopwatch({ autoStart: false });
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [speedX, setSpeedX] = useState<number>(0);
  const [speedY, setSpeedY] = useState<number>(0);
  const [speedZ, setSpeedZ] = useState<number>(0);
  let today = new Date();
  const Click= () =>{
    console.log(session?.user.id)
    let activity_length = (hours*60) + (minutes*60) + (seconds*60);
    if(activity_length === 0) return;
    axios.post('https://7277-124-155-51-210.ngrok.io/history/' + 100 , {
      user_id: 100,
      data_type: "track",
      track_date: today,
      track_length: activity_length
    }).then(response => console.log(response.status));
  } 

  let counter = 0;
  const calcurate_avarage_accel_time = 180;
  let acclerationAverageArray: Motion[] = [];
  let acclerationAverage: Motion = {
    x: 0,
    y: 0,
    z: 0,
  }
  //setIntervalバッファ用
  let calculator: any;
  //加速度平均算出
  function getAcclerationAverage(acc: DeviceMotionEventAcceleration){
    counter++;
    let acclerationBuffer : Motion = {
      x: 0,
      y: 0,
      z: 0,
    };
    acclerationBuffer.x = NumberTypeAdapter(acc.x);
    acclerationBuffer.y = NumberTypeAdapter(acc.y);
    acclerationBuffer.z = NumberTypeAdapter(acc.z);
    if(counter !== calcurate_avarage_accel_time){
      acclerationAverageArray.push(acclerationBuffer);
      counter++;
      acclerationAverage.x = (((acclerationAverage.x *(counter-1)) + (acclerationBuffer.x))/counter);
      acclerationAverage.y = (((acclerationAverage.y *(counter-1))+ (acclerationBuffer.y))/counter);
      acclerationAverage.z = (((acclerationAverage.z *(counter-1))+ (acclerationBuffer.z))/counter);
    }else if(counter >= calcurate_avarage_accel_time){
      acclerationAverageArray.push(acclerationBuffer);
      let subjectdata: Motion | undefined = acclerationAverageArray.shift();
      
      if(subjectdata !== (undefined)){
        //180秒前のデータ削除
        acclerationAverage.x = (((acclerationAverage.x*(counter)) - (NumberTypeAdapter(subjectdata.x)))/counter);
        acclerationAverage.y = (((acclerationAverage.y*(counter)) - (NumberTypeAdapter(subjectdata.y)))/counter);
        acclerationAverage.z = (((acclerationAverage.z*(counter))- (NumberTypeAdapter(subjectdata.z)))/counter);
        //新しいデータを挿入
        acclerationAverage.x = (((acclerationAverage.x *(counter-1))+ (acclerationBuffer.x))/counter);
        acclerationAverage.y = (((acclerationAverage.y *(counter-1))+ (acclerationBuffer.y))/counter);
        acclerationAverage.z = (((acclerationAverage.z *(counter-1))+ (acclerationBuffer.z))/counter);
      }
    }
  }
  // Android or other ios
  const AvgTimer = (e: DeviceMotionEvent) => {
    if(isRunning && calculator === (undefined))calculator = setInterval(getAcclerationAverage,1000, e.accelerationIncludingGravity);
    else if(!isRunning) clearInterval(calculator);
  }
  useEffect(() => {
    window.addEventListener("devicemotion", (e: DeviceMotionEvent) => {
      if (!e.accelerationIncludingGravity) {
        alert('event.accelerationIncludingGravity is null');
        return;
      }
      setSpeedX(NumberTypeAdapter(e.accelerationIncludingGravity.x));
      setSpeedY(NumberTypeAdapter(e.accelerationIncludingGravity.y));
      setSpeedZ(NumberTypeAdapter(e.accelerationIncludingGravity.z));
      AvgTimer(e);
      if(counter >= calcurate_avarage_accel_time && (Math.abs(acclerationAverage.x - NumberTypeAdapter(e.accelerationIncludingGravity.x)) < 5 || Math.abs(acclerationAverage.y - NumberTypeAdapter(e.accelerationIncludingGravity.y)) < 5 || Math.abs(acclerationAverage.z - NumberTypeAdapter(e.accelerationIncludingGravity.z)) < 5)){
        pause;
      }
    })
  })
  // DeviceMotionEvent.requestPermission() have ios 13 above only 
  const deviceMotionRequest = () => {
    //@ts-ignore
    if(DeviceMotionEvent.requestPermission){
      //@ts-ignore
      DeviceMotionEvent.requestPermission()
      //@ts-ignore
        .then(permissionState => {
          if(permissionState === 'granted'){
            window.addEventListener("devicemotion", (e: DeviceMotionEvent) => {
              if (!e.accelerationIncludingGravity) {
                alert('event.accelerationIncludingGravity is null');
                return;
              }
              setSpeedX(NumberTypeAdapter(e.accelerationIncludingGravity.x));
              setSpeedY(NumberTypeAdapter(e.accelerationIncludingGravity.y));
              setSpeedZ(NumberTypeAdapter(e.accelerationIncludingGravity.z));
              AvgTimer(e);
              if(counter >= calcurate_avarage_accel_time && (Math.abs(acclerationAverage.x - NumberTypeAdapter(e.accelerationIncludingGravity.x)) < 2 || Math.abs(acclerationAverage.y - NumberTypeAdapter(e.accelerationIncludingGravity.y)) < 2 || Math.abs(acclerationAverage.z - NumberTypeAdapter(e.accelerationIncludingGravity.z)) < 2)){
                pause;
              }
            })
          }
        })
        .catch(console.error);
      } else {
        console.log('DeviceMotionEvent.request is not found');
      }
    }
  useEffect(() => {
    session ?  "" : router.replace('/app/login');
  }, []);
  // スコア計算:
  // 基礎:((100 * Streak) + ((分 + 1) * 10) + (((累計h(分以下切り捨て))*2)^ (1.125 ~ 2)) ))
  return (
    <>
    <Header/>
    <div style={{textAlign: "center"}}>
        <Button variant="outlined" onClick={deviceMotionRequest}>ios13以降の場合は最初にここをタップ</Button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "50px" }}>
            <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
          </div>
            <p>{isRunning ? "Running" : " "}</p>
            <Button onClick={start}>Start</Button>
            <Button onClick={pause}>Pause</Button>
          </div>
        <Button variant="contained" onClick={Click}>完了する！</Button>
        <div>
          <small>debug: </small>
          <span>x: {speedX * 100} </span>
          <span>y: {speedY * 100} </span>
          <span>z: {speedZ * 100} </span>
        </div>
    </div>
    </>
  )
}

export default Track;

