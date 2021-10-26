import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { DependencyList, useCallback, useEffect } from "react";
import Header from "../../components/header";
//Windowevent取得用Hooks
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


const Track: NextPage = () => {
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  //加速度取得ハンドラ
  const MotionHandler = useCallback(
    (e: DeviceMotionEvent) => {
      console.log(e.accelerationIncludingGravity?.x);
      console.log(e.accelerationIncludingGravity?.y);
      console.log(e.accelerationIncludingGravity?.z);
      e.preventDefault();
    }, []
  );
  //加速度取得
  useWindowEvent("devicemotion", MotionHandler, []);
  return (
    <div>
      <Header/>
      <p>aaa</p>
    </div>
  )
}

export default Track;