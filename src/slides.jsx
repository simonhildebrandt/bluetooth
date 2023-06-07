import React from 'react';

import {
  Image,
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Link,
  HStack,
  Flex
} from '@chakra-ui/react';

import Slide from './slide';
import SlideContext from './slide-context';

import Bluetooth from './bluetooth';
import { FirstCode, SecondCode } from './code';


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
        <HStack gap={4}>
          <Image src="assets/photo.jpg" objectFit='cover' boxSize="300px"/>
          <Flex flexDir="column">
            <Text>
              <Link href="https://login-with.link">Login-With.Link</Link> (authentication)
            </Text>
            <Text>
              <Link href="https://runto.store">RunTo.Store</Link> (shopping list app)
            </Text>
            <Text>
              <Link href="https://simonhildebrandt.github.io/scrawl/">Scrawl</Link> (pixel-art editor)
            </Text>
            <Text>
              <Link href="https://simonhildebrandt.com">SimonHildebrandt.com</Link> (my blog)
            </Text>
          </Flex>
        </HStack>
    </Slide>

    <Slide id="why">
      <Heading size="lg">So... why?</Heading>
      <HStack gap={4}>
        <Image src="assets/nanoleaf.webp" objectFit='cover' boxSize="300px"/>
        <Text>
          Nanoleaf tiles - these are cool, but expensive
        </Text>
      </HStack>
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
        files between nearby portable devices and connect cell phones and music players with wireless
        headphones."</Text>

        <Text>(https://en.wikipedia.org/wiki/Bluetooth)</Text>
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
      <Text><Link target="_blank" href="https://en.wikipedia.org/wiki/List_of_Bluetooth_profiles#Generic_Attribute_Profile_(GATT)">https://en.wikipedia.org/wiki/List_of_Bluetooth_profiles</Link></Text>
    </Slide>

    <Slide id="ourprofile">
      <Heading size="lg">Working with profiles</Heading>
      <Text>
        If industry uses standarised profiles for interoperability, what's the easiest way to create our own weird behaviour? Use the <b>Generic Attribute Profile</b> (GATT).
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
        GATT services are, in turn, a group of <b>characteristics</b>.
      </Text>
      <Text>
        Each characteristic also has a unique id.
      </Text>
      <Text>
        A characteristic represents a value - something like a number.
      </Text>
    </Slide>

    <Slide id="device">
      <Heading size="lg">Introducing the attention-getting device</Heading>
      <Image src="assets/attention-getting-device.jpeg" objectFit='contain' height="600px"/>
      <Text>(With apologies to Gary Larson.)</Text>
    </Slide>

    <Slide id="embedded">
      <Heading size="lg">A brief diversion - embedded development</Heading>
      <HStack gap={4}>
        <Image src="assets/xiao.jpeg" objectFit='cover' mt="100px" height="300px"/>
        <Flex flexDir="column">
          <Text>
            <Link href="https://www.seeedstudio.com/Seeed-XIAO-ESP32C3-p-5431.html">Seeed Studio XIAO ESP32C3</Link>
          </Text>
          <Text>
            <Link href="https://www.seeedstudio.com/Seeeduino-XIAO-Expansion-board-p-4746.html">Seeed Studio Expansion Board Base for XIAO with Grove OLED</Link>
          </Text>
        </Flex>
      </HStack>
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

    <Slide id="essentials">
      <Heading size="lg">Basics - Bluetooth essentials</Heading>
      <FirstCode/>
    </Slide>

    <Slide id="security">
      <Heading size="lg">Basics - Bluetooth security</Heading>
      <SecondCode/>
    </Slide>

    <Slide id="example">
      <Heading size="lg">Example app</Heading>

      <Bluetooth/>
    </Slide>

    <Slide id="final">
      <Heading size="lg">Thanks!</Heading>

      <Text>Questions?</Text>

      <Text>
        This presentation:
      </Text>
      <Text>
        <Link href="https://github.com/simonhildebrandt/bluetooth">https://github.com/simonhildebrandt/bluetooth</Link>
      </Text>
    </Slide>

  </SlideContext.Provider>
}
