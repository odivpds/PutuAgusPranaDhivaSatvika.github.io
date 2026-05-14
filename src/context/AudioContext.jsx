import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import musicBalanceAudio from '../assets/musicbalance.mp3';
import clickAudio from '../assets/click.mp3';

const AudioContext = createContext(null);

export const AudioProvider = ({ children }) => {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const bgMusicRef = useRef(null);
  const clickSFXRef = useRef(null);
  const swooshSFXRef = useRef(null);

  // Initialize Audio Objects
  useEffect(() => {
    bgMusicRef.current = new Audio(musicBalanceAudio);
    bgMusicRef.current.loop = true;
    
    clickSFXRef.current = new Audio(clickAudio);
    swooshSFXRef.current = new Audio(clickAudio); // using click as swoosh initially because it's the same in old code
    
    // Check saved state
    const savedMusicState = localStorage.getItem('musicWasPlaying');
    if (savedMusicState === 'true') {
      const savedTime = localStorage.getItem('musicCurrentTime');
      if (savedTime && !isNaN(savedTime)) {
        bgMusicRef.current.currentTime = parseFloat(savedTime);
      }
      // Wait for user interaction to resume
      const resumeAudio = () => {
        bgMusicRef.current.play().then(() => {
          setIsMusicPlaying(true);
          fadeInMusic(0.2);
        }).catch(() => {});
        document.removeEventListener('click', resumeAudio);
        document.removeEventListener('scroll', resumeAudio);
        document.removeEventListener('touchstart', resumeAudio);
      };
      document.addEventListener('click', resumeAudio);
      document.addEventListener('scroll', resumeAudio);
      document.addEventListener('touchstart', resumeAudio);
    }

    const saveTimeInterval = setInterval(() => {
      if (bgMusicRef.current && !bgMusicRef.current.paused) {
        localStorage.setItem('musicCurrentTime', bgMusicRef.current.currentTime);
      }
    }, 1000);

    return () => {
      clearInterval(saveTimeInterval);
      if (bgMusicRef.current) {
         localStorage.setItem('musicCurrentTime', bgMusicRef.current.currentTime);
      }
    };
  }, []);

  const fadeInMusic = (targetVol = 0.2) => {
    if (!bgMusicRef.current) return;
    let vol = 0;
    bgMusicRef.current.volume = 0;
    const fadeIn = setInterval(() => {
      vol += 0.02;
      if (vol >= targetVol) {
        bgMusicRef.current.volume = targetVol;
        clearInterval(fadeIn);
      } else {
        bgMusicRef.current.volume = vol;
      }
    }, 150);
  };

  const fadeOutMusic = () => {
    if (!bgMusicRef.current) return;
    let vol = bgMusicRef.current.volume;
    const fadeOut = setInterval(() => {
      vol -= 0.02;
      if (vol <= 0) {
        bgMusicRef.current.volume = 0;
        bgMusicRef.current.pause();
        clearInterval(fadeOut);
      } else {
        bgMusicRef.current.volume = vol;
      }
    }, 100);
  };

  const toggleMusic = () => {
    if (isMusicPlaying) {
      fadeOutMusic();
      setIsMusicPlaying(false);
      localStorage.setItem('musicWasPlaying', 'false');
    } else {
      bgMusicRef.current.volume = 0;
      bgMusicRef.current.play().then(() => {
        fadeInMusic();
        setIsMusicPlaying(true);
        localStorage.setItem('musicWasPlaying', 'true');
      }).catch(() => {});
    }
  };

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
    if (bgMusicRef.current) {
      bgMusicRef.current.currentTime = 0;
      bgMusicRef.current.volume = 0;
      bgMusicRef.current.play().then(() => {
        fadeInMusic();
        setIsMusicPlaying(true);
        localStorage.setItem('musicWasPlaying', 'true');
      }).catch(() => {});
    }
  };

  return (
    <AudioContext.Provider value={{
      isMusicPlaying,
      toggleMusic,
      playClickSFX,
      startExperience
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
