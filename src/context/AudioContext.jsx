import React, { createContext, useContext, useEffect, useRef } from 'react';
import clickAudio from '../assets/click.mp3';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const clickSFXRef = useRef(null);
  const swooshSFXRef = useRef(null);

  // Initialize SFX Audio Objects and clean up legacy music local storage
  useEffect(() => {
    clickSFXRef.current = new Audio(clickAudio);
    swooshSFXRef.current = new Audio(clickAudio);

    try {
      localStorage.removeItem('musicWasPlaying');
      localStorage.removeItem('musicCurrentTime');
    } catch {
      // Ignore storage errors on restricted environments
    }
  }, []);

  const playClickSFX = (volume = 0.4) => {
    if (clickSFXRef.current) {
      clickSFXRef.current.currentTime = 0;
      clickSFXRef.current.volume = volume;
      clickSFXRef.current.play().catch(() => {});
    }
  };

  const playSwooshSFX = (volume = 0.6) => {
    if (swooshSFXRef.current) {
      swooshSFXRef.current.currentTime = 0;
      swooshSFXRef.current.volume = volume;
      swooshSFXRef.current.play().catch(() => {});
    }
  };

  const startExperience = () => {
    playSwooshSFX();
  };

  return (
    <AudioContext.Provider value={{
      isMusicPlaying: false,
      toggleMusic: () => {},
      playClickSFX,
      playSwooshSFX,
      startExperience
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
