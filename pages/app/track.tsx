import zIndex from "@material-ui/core/styles/zIndex";
import { useStopwatch, useTimer } from "react-timer-hook";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { DependencyList, useCallback, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Header from "../../components/header";
//Windowevent取得用Hooks
type Motion = {
  x: Number,
  y: Number,
  z: Number,
}

const useWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  deps: DependencyList,
  options?: boolean | AddEventListenerOptions
) => useEffect(() => {
    if(window){
      window.addEventListener(type, listener, options);
      return () => {
        window.removeEventListener(type,listener, options);
      }
    }
  }, deps);

let Motionbuffer : Motion = {
  x: 0,
  y: 0,
  z: 0,
}

function NumberTypeAdapter(x: null | undefined | number) : number{
  return x = x !== (null) ? (x !== (undefined) ? x : 0) : 0
}
//加速度取得ハンドラ
const UpdaterElement = () => {
  return(
  <section>
    <p>x: {Motionbuffer.x}</p>
    <p>y: {Motionbuffer.y}</p>
    <p>z: {Motionbuffer.z}</p>
  </section>
  );
}
//運動時間計測
const Stopwatch = () => {
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } =
    useStopwatch({ autoStart: false });

  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "50px" }}>
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? "Running" : "Not running"}</p>
      <Button onClick={start}>Start</Button>
      <Button onClick={pause}>Pause</Button>
    </div>
  );
}

//現在位置取得

//運動距離計測(Google Maps Direction API)


//ページ実装
const Track: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [speedX, setSpeedX] = useState<number>(0);
  const [speedY, setSpeedY] = useState<number>(0);
  const [speedZ, setSpeedZ] = useState<number>(0);
  useEffect(() => {
    // Android or other ios
    window.addEventListener("devicemotion", (e: DeviceMotionEvent) => {
      if (!e.accelerationIncludingGravity) {
        alert('event.accelerationIncludingGravity is null');
        return;
      }
      setSpeedX(NumberTypeAdapter(e.accelerationIncludingGravity.x));
      setSpeedY(NumberTypeAdapter(e.accelerationIncludingGravity.y));
      setSpeedZ(NumberTypeAdapter(e.accelerationIncludingGravity.z));
    })
  })
  const deviceMotionRequest = () => {
    //@ts-ignore
    // only have ios 13 above
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
            })
          }
        })
        .catch(console.error);
      } else {
        console.log('DeviceMotionEvent.request is not found');
      }
    }
  return (
    <div>
      <Header/>
      <Button onClick={deviceMotionRequest}>ios13の場合は最初にここをタップ</Button>
      <Stopwatch/>
      <div>
        <span>x: {speedX * 100} </span>
        <span>y: {speedY * 100} </span>
        <span>z: {speedZ * 100} </span>
      </div>
    </div>
  )
}

export default Track;

