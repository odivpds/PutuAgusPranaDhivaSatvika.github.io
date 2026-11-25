import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';

const Home = () => {
  return (
    <>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </>
  );
};

export default Home;
