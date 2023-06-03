import React from 'react';

import { Select } from '@chakra-ui/react';


export default ({value, sendValue}) => {
  return <Select value={value} onChange={sendValue}>
    <option value="a">Rainbow</option>
    <option value="b">Lines</option>
  </Select>
}
