import React from 'react';

import { Image, Box, Heading, Text, UnorderedList, ListItem, Link } from '@chakra-ui/react';

import Slide from './slide';
import SlideContext from './slide-context';

import Bluetooth from './bluetooth';


export default ({currentSlide}) => {
  return <SlideContext.Provider value={currentSlide}>
    <Slide id="who">
      <Heading size="lg">Who am I?</Heading>
      <Text>
          I'm Simon Hildebrandt.
        </Text>
        <Text>
          I'm a web developer, working as a team lead at <b>Equinox Ventures</b>.
        </Text>
        <Text>
          I'm interested in hardware hacking, 3D printing, laser cutting.
        </Text>
        <Image src="assets/photo.jpg" objectFit='cover' boxSize="300px"/>
    </Slide>

    <Slide id="whatis">
      <Heading size="lg">What Is Bluetooth?</Heading>
      <Box textStyle="quote">
        <Text>"Bluetooth is a short-range technology standard that is used for exchanging data
        between fixed and mobile devices over short distances and building personal area
        networks. In the most widely used mode, transmission power is limited to 2.5
        milliwatts, giving it a very short range of up to 10 metres.</Text>

        <Text>It employs Ultra high frequency radio waves in the ISM bands, from 2.402 GHz to
        2.48 GHz. It is mainly used as an alternative to wire connections, to exchange
        files between nearby portable devices and connect and music players with wireless
        headphones."</Text>
      </Box>
      <Text>(Bluetooth 4.0 included Classic Bluetooth, Bluetooth high speed and Bluetooth
        Low Energy - we're now at Bluetooth 5.0.)</Text>
    </Slide>

    <Slide id="huh">
      <Heading size="lg">Huh?</Heading>
      <Text>You mean like wifi?</Text>
    </Slide>

    <Slide id="nope">
      <Heading size="lg">Not really...</Heading>
      <Text>Wifi does one thing - provide internet.</Text>
    </Slide>

    <Slide id="different">
      <Heading size="lg">Bluetooth is different</Heading>
      <Text>Think about how you've used Bluetooth:</Text>
      <UnorderedList>
        <ListItem>Phone headset</ListItem>
        <ListItem>Wireless earphones</ListItem>
        <ListItem>Wireless speaker</ListItem>
        <ListItem>Wireless keyboard</ListItem>
        <ListItem>Wireless printer</ListItem>
      </UnorderedList>
    </Slide>

    <Slide id="profiles">
      <Heading size="lg">Profiles</Heading>
      <Text>
        Each of those examples is a different kind of behaviour, and in Bluetooth these behaviours are called <b>profiles.</b>
      </Text>
      <Text><Link target="_blank" href="https://en.wikipedia.org/wiki/List_of_Bluetooth_profiles#Generic_Access_Profile_(GAP)">https://en.wikipedia.org/wiki/List_of_Bluetooth_profiles#Generic_Access_Profile_(GAP)</Link></Text>
    </Slide>

    <Slide id="ourprofile">
      <Heading size="lg">Working with profiles</Heading>
      <Text>
        If Bluetooth is defined through profiles, what's the easiest way to create our own behaviour? Use the <b>Generic Attribute Profile</b> (GATT).
      </Text>
      <Text>
        (The GATT is actually a foundational part of the Bluetooth Low Energy standard, which was introduced as part of Bluetooth 4.0).
      </Text>
    </Slide>

    <Slide id="services">
      <Heading size="lg">GATT Services</Heading>
      <Text>
        The GATT uses <b>services</b> to group behaviour.
      </Text>
      <Text>
        Each service has a unique id.
      </Text>
    </Slide>

    <Slide id="characteristics">
      <Heading size="lg">GATT Characteristics</Heading>
      <Text>
        GATT services, in turn, are a group of <b>characteristics</b>.
      </Text>
      <Text>
        Each characteristic also has a unique id.
      </Text>
      <Text>
        A characteristic represents a value - something like a number.
      </Text>
    </Slide>

    <Slide id="device">
      <Heading size="lg">The attention getting device</Heading>
      <Image src="assets/attention-getting-device.jpeg" objectFit='contain' boxSize="600px"/>
      <Text>(With apologies to Gary Larson.)</Text>
    </Slide>

    <Slide id="devicecode">
      <Heading size="lg">A brief diversion - embedded development</Heading>
    </Slide>

    <Slide id="setup">
      <Heading size="lg">Browser setup</Heading>
      <Text>
        <Link target="_blank" href="chrome://flags/#enable-web-bluetooth-new-permissions-backend"> chrome://flags/#enable-web-bluetooth-new-permissions-backend</Link>
      </Text>
      <Text>
        Enable, then restart browser.
      </Text>
    </Slide>

    <Slide id="xxx">
      <Heading size="lg">XXX</Heading>
      <Text>
        <Link target="_blank" href="chrome://flags/#enable-web-bluetooth-new-permissions-backend"> chrome://flags/#enable-web-bluetooth-new-permissions-backend</Link>
      </Text>
      <Text>
        Enable, then restart browser.
      </Text>
    </Slide>

    <Slide id="example">
      <Heading size="lg">Example app</Heading>

      <Bluetooth/>
    </Slide>

  </SlideContext.Provider>
}
