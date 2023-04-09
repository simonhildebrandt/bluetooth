import React from 'react';

import { Flex, Box } from '@chakra-ui/react';


export default ({value}) => {
  const values = value.split(',').map(Number);

  return <Flex>
    { values.map((v, i) => <Circle key={i} index={i} value={v}/>) }
  </Flex>
}

const colors = ['red', 'green', 'blue'];
const Circle = ({value, index}) => {
  const rotate = value * -90;
  return <Flex width={200} height={200} justify="center">
    <Box
      width="20px"
      height={200}
      bgColor={colors[index]}
      transform={`rotate(${rotate}deg)`}
    />
  </Flex>;
}

