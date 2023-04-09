import React, { useEffect, useState } from 'react';

import { Box, Flex, Button, Heading } from '@chakra-ui/react';

import Updating from './updating';
import Circles from './circles';


const serviceUuid = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const charUuids = [
  "beb5483e-36e1-4688-b7f5-ea07361b26a8",
  "beb5483e-36e1-4688-b7f5-ea07361b26a9",
];

navigator.bluetooth.getAvailability().then(result => console.log('bluetooth?', {result}));


export default Bluetooth = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const findMatches = () => {
    navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [serviceUuid]
    })
  }

  useEffect(() => {
    const cancelId = setInterval(() => {
      setLoading(true);
      navigator.bluetooth.getDevices().then(devs => {
        setLoading(false);
        setDevices(devs);
      });
    }, 2000);

    return () => cancelInterval(cancelId);
  }, []);

  return <Box bgColor="white" p={8}>
    <Box>
      <Flex align="center" justify="space-between">
        <Heading size="md">Devices</Heading>
        <Flex align="center" gap={2}>
          <Button colorScheme="green" onClick={findMatches}>Match Devices</Button>
          <Updating updating={loading}/>
        </Flex>
      </Flex>
      { devices.map(device => (
        <Device key={device.id} device={device}/>
      )) }
    </Box>
  </Box>
};

const Device = ({device}) => {
  const [gatt, setGatt] = useState(device.gatt);
  const [connecting, setConnecting] = useState(false);

  function connect(gatt) {
    setConnecting(true);
    gatt.connect()
      .then(server => setGatt(server))
      .finally(() => setConnecting(false))
    ;
  }

  function disconnect(gatt) {
    gatt.disconnect();
    device.forget();
  }

return <Flex flexDir="column">
    <Flex align="center" gap={2}>
      <Flex gap={4}>
        <b>{ device.name }</b>
        { device.gatt.connected ? (
          <Button onClick={() => disconnect(device.gatt)}>disconnect</Button>
        ) : (
          <Button onClick={() => connect(device.gatt)}>connect</Button>
        )}
      </Flex>
      <Updating updating={connecting}/>
    </Flex>

    { device.gatt.connected && (
      <Service gatt={device.gatt}/>
    )}
  </Flex>
}

const Service =({gatt}) => {
  const [service, setService] = useState(null);

  useEffect(() => {
    gatt.getPrimaryService(serviceUuid).then(serv => setService(serv));
  }, []);

  return service ? charUuids.map(charUuid => <Characteristic key={charUuid} service={service} charUuid={charUuid}/> ) : null;
}

const Characteristic = ({service, charUuid}) => {
  const [characteristic, setCharacteristic] = useState(null);
  const [value, setValue] = useState(null);

  useEffect(() => {
    service.getCharacteristic(charUuid).then(characteristic => {
      setCharacteristic(characteristic);

      if (characteristic.properties.notify) {
        characteristic.startNotifications().then(_ => {
          characteristic.addEventListener(
            'characteristicvaluechanged',
            event => {
              setValue(new TextDecoder().decode(event.target.value.buffer))
            }
          );
        });
      }
    });
  }, []);

  const setV = (v) => {
    const dv = new DataView(new ArrayBuffer(1));
    setValue(v);
    dv.setUint8(0, v);
    // const buffer = new TextEncoder().encode("Here");
    characteristic.writeValueWithResponse(dv.buffer);
    // characteristic.writeValueWithResponse(buffer);
  }

  return <div>
    { typeof(value) == 'string' ? <Circles value={value}/> : value }<br/>
    <button onClick={() => setV(0)}>0</button>
    <button onClick={() => setV(1)}>1</button>
  </div>
}

