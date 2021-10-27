import zIndex from "@material-ui/core/styles/zIndex";
import { useStopwatch, useTimer } from "react-timer-hook";
import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { DependencyList, useCallback, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import Header from "../../components/header";
import styles from '../../styles/Home.module.css';
import Link from "next/link";
import { style } from "@mui/system";
import { TextField, TextFieldProps } from "@mui/material";
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
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  return (
    <div>
        <Header/>
        <h2>運動を記録する🏃</h2>
        <div className={styles.grid}>
          運動開始日時: 
          <MobileDateTimePicker
            value={startDate}
            onChange={(newDate: Date | null) => {
              setStartDate(newDate);
            }}
            label="開始時間"
            onError={console.log}
            minDate={new Date('2018-01-01T00:00')}
            inputFormat="yyyy/MM/dd hh:mm a"
            mask="___/__/__ __:__ _M"
            renderInput={(params: TextFieldProps) => <TextField {...params} />}
          />
          運動終了日時: 
          <MobileDateTimePicker
            value={endDate}
            onChange={(newDate: Date | null) => {
              setEndDate(newDate);
            }}
            label="終了時間"
            onError={console.log}
            minDate={new Date('2018-01-01T00:00')}
            inputFormat="yyyy/MM/dd hh:mm a"
            mask="___/__/__ __:__ _M"
            renderInput={(params: TextFieldProps) => <TextField {...params} />}
          />
        </div>
        <Button variant="contained">記録する！</Button>
    </div>
  )
}

export default Track;
