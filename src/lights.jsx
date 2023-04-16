import React from 'react';

import { Select } from '@chakra-ui/react';


export default ({value, sendValue}) => {
  return <Select value={value} onChange={sendValue}>
    <option value="a">Forward</option>
    <option value="b">Backward</option>
  </Select>
}
