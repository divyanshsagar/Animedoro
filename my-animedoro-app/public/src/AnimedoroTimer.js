import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Film,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  RefreshCw,
  RefreshCcw,
} from "lucide-react";

const AnimedoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(40 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isWorkMode, setIsWorkMode] = useState(true);
  const [episodes, setEpisodes] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isAutoContinue, setIsAutoContinue] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleTimerComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const playSound = () => {
    if (!isSoundEnabled) return;
    const audio = new Audio(process.env.PUBLIC_URL + "/notification.mp3");
    audio.play().catch((error) => console.log("Audio play failed:", error));
  };

  const handleTimerComplete = () => {
    playSound();
    if (isWorkMode) {
      setTimeLeft(23 * 60);
      setIsWorkMode(false);
      setEpisodes((e) => e + 1);
    } else {
      setTimeLeft(40 * 60);
      setIsWorkMode(true);
    }
    if (isAutoContinue) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const resetTimer = () => {
    setTimeLeft(isWorkMode ? 40 * 60 : 23 * 60);
    setIsRunning(false);
  };

  const progress = (timeLeft / (isWorkMode ? 40 * 60 : 23 * 60)) * 100;

  return (
    <div
      className="min-h-screen p-8 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://i.pinimg.com/originals/3x/3xwkLV8lc.jpg')`,
      }}
    >
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex justify-end mb-4 space-x-2">
          <button onClick={() => setIsAutoContinue(!isAutoContinue)}>
            {isAutoContinue ? <RefreshCw /> : <RefreshCcw />}
          </button>
          <button onClick={() => setIsSoundEnabled(!isSoundEnabled)}>
            {isSoundEnabled ? <Volume2 /> : <VolumeX />}
          </button>
          <button onClick={() => setIsDarkMode(!isDarkMode)}>
            {isDarkMode ? <Sun /> : <Moon />}
          </button>
        </div>
        <div>
          <h1>{isWorkMode ? "Work Time!" : "Anime Time!"}</h1>
          <h2>{formatTime(timeLeft)}</h2>
          <button onClick={() => setIsRunning(!isRunning)}>
            {isRunning ? <Pause /> : <Play />}
          </button>
          <button onClick={resetTimer}>
            <RotateCcw />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnimedoroTimer;
