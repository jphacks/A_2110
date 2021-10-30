import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { DependencyList, useCallback, useEffect, useState } from "react";
import Button from '@mui/material/Button';
import MobileDateTimePicker from '@mui/lab/MobileDateTimePicker';
import Header from "../../components/header";
import styles from '../../styles/Home.module.css';
import { TextField, TextFieldProps } from "@mui/material";
import axios from "axios";
import router from "next/dist/client/router";
//ページ実装
const Track: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const Click= () =>{
  /*
    console.log(session?.user.id)
    axios.post('https://7277-124-155-51-210.ngrok.io/history/' + 100 , {
      user_id: 100,
      data_type: "record",
      start_date: startDate,
      end_date: endDate,  
    }).then(response => console.log(response.status))
      .catch(function (error) {
        if (error.response) {
          // Request made and server responded
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      })
      */
  }
  
  useEffect(() => {
  }, []);
  return (
    <div>
        <Header/>
        <div style={{textAlign: "center"}}>
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
        <Button variant="contained" onClick={Click}>
          記録する！
        </Button>
          

      </div>
    </div>
  )
}

export default Track;
