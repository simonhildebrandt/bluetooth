import React, { useState, useEffect, useCallback } from 'react';

import { Flex, Heading } from '@chakra-ui/react';

import Slides from './slides';


const DIRECTIONS = {
  Space: 1,
  Backspace: -1,
};

export default App = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(null);

  function updateCurrentSlide(slide) {
    setCurrentSlide(slide);
    localStorage.setItem('currentSlide', slide)
  }

  const handleKey = useCallback(event => {
    const direction = DIRECTIONS[event.code];

    if (direction) {
      event.preventDefault();
      const index = slides.indexOf(currentSlide);
      const newSlide = slides[(index + direction + slides.length) % slides.length];
      document.getElementById(newSlide).scrollIntoView();
      updateCurrentSlide(newSlide);
    }
  }, [slides, currentSlide]);

  useEffect(() => {
    const ids = [...document.querySelectorAll("div.slide")].map(s => s.id);
    setSlides(ids);
    const firstSlide = localStorage.getItem('currentSlide') || ids[0];
    updateCurrentSlide(firstSlide);
    document.getElementById(firstSlide).scrollIntoView();
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [currentSlide, slides]);

  return <Flex flexDir="column" lineHeight="10" height="100%" bgColor="blue.100">
    <Flex bgColor="blue.600" px={6} py={4} justify="flex-end">
      <Heading color="blue.400">Bluetooth in the Browser</Heading>
    </Flex>

    <Flex m="auto" height="100%" overflow="hidden">
      <Flex flexDir="column" m="auto" maxWidth={800} px={8} pb={800} flexGrow={1} overflowY="auto" scrollBehavior="smooth">
        <Slides currentSlide={currentSlide}/>
      </Flex>
    </Flex>
  </Flex>
}
