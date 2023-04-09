import React, { useEffect, useState } from 'react';

import { Icon } from '@chakra-ui/react';

import {
  MdSignalWifiStatusbar1Bar,
  MdSignalWifiStatusbar2Bar,
  MdSignalWifiStatusbar3Bar
} from 'react-icons/md';


const icons = [
  MdSignalWifiStatusbar1Bar,
  MdSignalWifiStatusbar2Bar,
  MdSignalWifiStatusbar3Bar
]

export default ({updating}) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    if (updating) {
      if (state === null) {
        setState(0);
        setTimeout(() => setState(1), 100);
      }
    }

    if (state === 1) {
      setTimeout(() => setState(2), 100);
    }
    if (state === 2) {
      if (updating) {
        setTimeout(() => setState(0), 100);
      } else {
        setState(null);
      }
    }
  }, [updating, state]);

  const icon = state == null ? MdSignalWifiStatusbar3Bar : icons[state];
  const color =  state == null ? "gray.300" : "gray.500";

  return <Icon boxSize={6}  color={color} as={icon}/>
}
