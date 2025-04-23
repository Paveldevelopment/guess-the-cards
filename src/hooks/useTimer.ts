import { useState, useEffect, useRef, useCallback } from 'react';

function useTimer(initialTime: number, autoStart: boolean = true) {
  const [time, setTime] = useState(initialTime);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (intervalRef.current !== null) return;
    intervalRef.current = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetTimer = useCallback(
    (newTime?: number) => {
      stopTimer();
      setTime(newTime !== undefined ? newTime : initialTime);
      if (autoStart) {
        startTimer();
      }
    },
    [initialTime, autoStart, startTimer, stopTimer],
  );

  const addTime = useCallback((bonus: number) => {
    setTime((prevTime) => prevTime + bonus);
  }, []);

  useEffect(() => {
    if (autoStart) {
      startTimer();
    }
    return () => {
      stopTimer();
    };
  }, [autoStart, startTimer, stopTimer]);

  return { time, startTimer, stopTimer, resetTimer, addTime };
}

export default useTimer;
