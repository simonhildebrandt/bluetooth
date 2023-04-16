//Bluetooth

#include <BLEDevice.h>
#include <BLEUtils.h>
#include <BLEServer.h>
#include <BLE2902.h>

// Accelerometer
#include "LIS3DHTR.h"
#include <Wire.h>
LIS3DHTR<TwoWire> LIS; //IIC
#define WIRE Wire

// NeoPixel
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
 #include <avr/power.h>
#endif
#define PIN A0 //light strip connect to Pin A0 if you use XIAO RP2040, please change 0 to A0
#define NUMPIXELS 30 //number of Led on the light strip Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);


//create a new light strip object to define the data pattern
Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

// See the following for generating UUIDs:
// https://www.uuidgenerator.net/

#define SERVICE_UUID         "4fafc201-1fb5-459e-8fcc-c5c9c331914b"
#define CHARACTERISTIC1_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a8"
#define CHARACTERISTIC2_UUID "beb5483e-36e1-4688-b7f5-ea07361b26a9"

bool deviceConnected = false;
BLEServer *pServer = NULL;
BLECharacteristic *pMotionCharacteristic;
BLECharacteristic *pLightCharacteristic;

char lightType = 'a';


class MyServerCallbacks: public BLEServerCallbacks {
  void onConnect(BLEServer* pServer) {
    deviceConnected = true;
    Serial.println("Connected");
  };

  void onDisconnect(BLEServer* pServer) {
    deviceConnected = false;
    Serial.println("Disonnected");
    pServer->getAdvertising()->start();
  }
};

class MyCallbacks: public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pCharacteristic) {
    std::string value = pCharacteristic->getValue();
    lightType = value[0];
  }
};

void setup() {
  Serial.begin(115200);

  Serial.println("Starting accelerometer...");

  LIS.begin(WIRE, 0x19); //IIC init
  delay(100);
  LIS.setOutputDataRate(LIS3DHTR_DATARATE_50HZ);
  LIS.setHighSolution(true); //High solution enable


  Serial.println("Starting bluetooth...");

  BLEDevice::init("AttentionGetter2000");

  pServer = BLEDevice::createServer();
  pServer->setCallbacks(new MyServerCallbacks());
  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Motion characteristic
  pMotionCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC1_UUID,
    BLECharacteristic::PROPERTY_READ   |
    BLECharacteristic::PROPERTY_WRITE  |
    BLECharacteristic::PROPERTY_NOTIFY |
    BLECharacteristic::PROPERTY_INDICATE
  );

  pMotionCharacteristic->addDescriptor(new BLE2902());
//  pMotionCharacteristic->setCallbacks(new MyCallbacks());
  pMotionCharacteristic->setValue("0,0,0");

  // Light characteristic
  pLightCharacteristic = pService->createCharacteristic(
    CHARACTERISTIC2_UUID,
    BLECharacteristic::PROPERTY_READ |
    BLECharacteristic::PROPERTY_WRITE
  );

  pLightCharacteristic->setCallbacks(new MyCallbacks());
  int first = 'first';
  pLightCharacteristic->setValue(first);
  
  pService->start();
  pServer->getAdvertising()->start();

  pixels.begin(); // INITIALIZE NeoPixel strip object (REQUIRED)
}


int i = 0;

void loop() {
  delay(5);

  if ( i % 10 == 0) {
    float x, y, z;
    LIS.getAcceleration(&x, &y, &z);
    String result = String(x) + String(",") + String(y) + String(",") + String(z);
    pMotionCharacteristic->setValue(result.c_str());
    pMotionCharacteristic->notify();
  }

  
  int direction = lightType == 'a' ? 1 : -1;
  for (int b = 0; b < 5; b++) { // rows
    for (int a = 0; a < 6; a++) { // columns
      int led = b * 6 + a;
  
      byte * d;
      d = Wheel((i + (8 * b * direction)) % 256);
      pixels.setPixelColor(led, pixels.Color(d[0], d[1], d[2]));
    }
  }
  
  pixels.show();

  i++;
}

// Shamelessly lifted from here: https://www.tweaking4all.com/hardware/arduino/adruino-led-strip-effects/#LEDStripEffectRainbowCycle
byte * Wheel(byte WheelPos) {
  static byte c[3];
 
  if(WheelPos < 85) {
   c[0]=WheelPos * 3;
   c[1]=255 - WheelPos * 3;
   c[2]=0;
  } else if(WheelPos < 170) {
   WheelPos -= 85;
   c[0]=255 - WheelPos * 3;
   c[1]=0;
   c[2]=WheelPos * 3;
  } else {
   WheelPos -= 170;
   c[0]=0;
   c[1]=WheelPos * 3;
   c[2]=255 - WheelPos * 3;
  }

  return c;
}
