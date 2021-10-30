import axios from "axios";
import { secondsToMinutes } from "date-fns";
import { NextPage } from "next";
import { useSession } from "next-auth/react";
import router from "next/dist/client/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Header from "../../components/header";
import Track from "./record";

type track_history ={
  history: {
    user_id: string,
    data_type: string,
    track_date: Date,
    track_length: number,
    start_date: Date,
    end_date: Date,
    id: number
  }
}

const TrackHistory :NextPage =  () => {
  const { data: session, status } = useSession()
  const [data, setData] = useState<[]>()
  const loading = status === 'loading'
  useEffect(() => {
    session ?  "" : router.replace('/app/login');
  }, []);
  return(
    <>
      <Header />
        <div>
        </div>
    </>
  )
}

export default TrackHistory;