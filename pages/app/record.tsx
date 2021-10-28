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
