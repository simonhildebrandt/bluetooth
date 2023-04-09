import React, { useContext } from 'react';

import { Fade, Box } from '@chakra-ui/react';

import SlideContext from './slide-context';


export default Slide = ({id, children}) => {
  const activeSlide = useContext(SlideContext);
  return <Fade in={id === activeSlide}><Box id={id} py={16} className="slide">{children}</Box></Fade>
}
