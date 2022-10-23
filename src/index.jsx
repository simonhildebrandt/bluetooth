import "@babel/polyfill";

import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom';

const serviceUuid = "19B10000-E8F2-537E-4F6C-D104768A1214".toLowerCase();
const charUuid = "19B10001-E8F2-537E-4F6C-D104768A1214".toLowerCase();

navigator.bluetooth.getAvailability().then(result => console.log('bluetooth?', {result}));

const App = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(false);

  const findMatches = () => {
    navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      //services: ["19B10001-E8F2-537E-4F6C-D104768A1214".toLowerCase()]
      //name: 'LED'
      optionalServices: [serviceUuid]
    }).then(
      devs => {
        console.log({devs});
      }
    ).catch(error => console.log({error}));
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

  return <div>
    <button onClick={findMatches}>Match</button> {loading ? "*" : '-'}<br/>
    <div>
      <div>Devices</div>
      { devices.map(device => (
        <Device key={device.id} device={device}/>
      )) }
    </div>
  </div>
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
  }

return <div>
    { device.name } &nbsp;
    { device.gatt.connected ? (
      <button onClick={() => disconnect(device.gatt)}>disconnect</button>
    ) : (
      <button onClick={() => connect(device.gatt)}>connect</button>
    )}
    { connecting ? '*' : '-' }

    { device.gatt.connected && (
      <Service gatt={device.gatt}/>
    )}
  </div>
}

const Service =({gatt}) => {
  const [service, setService] = useState(null);
  const [characteristic, setCharacteristic] = useState(null);

  useEffect(() => {
    gatt.getPrimaryService(serviceUuid).then(serv => setService(serv));
  }, []);

  useEffect(() => {
    if (service) {
      service.getCharacteristic(charUuid).then(char => setCharacteristic(char));
    }
  }, [service]);

  return characteristic ? <Characteristic characteristic={characteristic}/> : null;
}

const Characteristic = ({characteristic}) => {
  const [value, setValue] = useState(null);

  const updateValue = val => {
    console.log({val});
    setValue(val.getUint8());
  };

  useEffect(() => {
    characteristic.readValue().then(updateValue);
  }, []);

  const handleValue = useCallback(updateValue);

  useEffect(() => {
    characteristic.addEventListener('oncharacteristicvaluechanged', handleValue);
    return () => characteristic.remove('oncharacteristicvaluechanged', handleValue);
  }, []);

  const setV = (v) => {
    console.log('setting', v);
    const dv = new DataView(new ArrayBuffer(1));
    setValue(v);
    dv.setUint8(0, v);
    characteristic.writeValueWithResponse(dv.buffer);
  }

  return <div>
    { JSON.stringify({characteristic, value}) }<br/>
    <button onClick={() => setV(0)}>0</button>
    <button onClick={() => setV(1)}>1</button>
  </div>
}

ReactDOM.render(<App/>, document.getElementById('app'));
