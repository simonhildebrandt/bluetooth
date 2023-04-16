import React, { useEffect, useState } from 'react';

import {
  Box,
  Flex,
  Button,
  Heading,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Select
 } from '@chakra-ui/react';

import Updating from './updating';
import Circles from './circles';
import Lights from './lights';



const SERVICE_UUID = "4fafc201-1fb5-459e-8fcc-c5c9c331914b";
const CHARACTERISTICS = {
  "beb5483e-36e1-4688-b7f5-ea07361b26a8": Circles,
  "beb5483e-36e1-4688-b7f5-ea07361b26a9": Lights,
};



export default () => {
  const [available, setAvailable] = useState(null);

  useEffect(_ => {
    navigator.bluetooth.getAvailability().then(setAvailable);
  }, []);

  const getDevicesDefined = navigator.bluetooth.getDevices;
  const accessible = available && getDevicesDefined;

  if (accessible == null) return 'Checking...';
  if (accessible == false) return <Alert status='error'>
    <AlertIcon />
    <AlertTitle>Bluetooth not available!</AlertTitle>
    <AlertDescription>Use a Bluetooth-enabled browser, and enable Bluetooth.</AlertDescription>
  </Alert>;
  return <Bluetooth/>
}


const Bluetooth = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const findMatches = () => {
    navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [SERVICE_UUID]
    })
  }

  function checkDevices() {
    setLoading(true);
    navigator.bluetooth.getDevices().then(devs => {
      setLoading(false);
      setDevices(devs);
    });
  }

  useEffect(() => {
    checkDevices();
    const cancelId = setInterval(checkDevices, 1000);
    return _ => cancelInterval(cancelId);
  }, []);

  return <Box bgColor="white" p={8}>
    <Box>
      <Flex align="center" justify="space-between" mb={5}>
        <Heading size="md">Devices</Heading>
        <Flex align="center" gap={2}>
          <Button colorScheme="green" onClick={findMatches}>Find Devices</Button>
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
  const [connecting, setConnecting] = useState(false);
  const [error, setError] = useState(null);

  function connect(g) {
    setConnecting(true);
    g.connect()
      .then(_ => setError(null))
      .catch(setError)
      .finally(_ => setConnecting(false))
    ;
  }

  function disconnect(g) {
    g.disconnect();
    device.forget();
  }

  return <Flex flexDir="column">
    <Flex align="center" gap={2}>
      <Flex gap={4}>
        <b>{ device.name }</b>
        { device.gatt.connected ? (
          <Button onClick={_ => disconnect(device.gatt)}>disconnect</Button>
        ) : (
          <Button onClick={_ => connect(device.gatt)}>connect</Button>
        )}
      </Flex>
      <Updating updating={connecting}/>
      { error &&
        <Alert status='error'>
          <AlertIcon />
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      }
    </Flex>

    { device.gatt.connected && (
      <Service gatt={device.gatt}/>
    )}
  </Flex>
}

const Service =({gatt}) => {
  const [service, setService] = useState(null);

  useEffect(() => {
    gatt.getPrimaryService(SERVICE_UUID).then(setService);
  }, []);

  const charUuids = Object.keys(CHARACTERISTICS);
  return service ? charUuids.map(charUuid => <Characteristic key={charUuid} service={service} charUuid={charUuid}/> ) : null;
}

const Characteristic = ({service, charUuid}) => {
  const [characteristic, setCharacteristic] = useState(null);
  const [value, setValue] = useState('first');

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

  const sendValue = (event) => {
    const v = event.target.value;
    setValue(v);
    const buffer = new TextEncoder().encode(v);
    characteristic.writeValueWithResponse(buffer);
  }

  const Component = CHARACTERISTICS[charUuid];

  return <Flex flexDir="column" mt={4}>
    <Heading size="sm" my={2}>{charUuid}</Heading>
    <Component value={value} sendValue={sendValue}/>
  </Flex>
}

