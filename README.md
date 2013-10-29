# 2013 I love Api's Phillip's Hue Demo

## Running Server

```
cp example_init.sh init.sh // fill out init.sh with details
npm install
source init.sh
node app.js
```

## Network Configuration

- **Router:** 10.0.0.1
  - user:admin
  - pass:abc123!

- **Raspberry Pi:** 10.0.0.3
  - user:pi
  - pass:abc123!

- **Light Gateway:** 10.0.0.10

## Raspberry Pi Setup

The Raspberry will automatically start two node servers controlling lights one and two respectively.

 - Server 1: http://10.0.0.3:3000/
 - Server 2: http://10.0.0.3:3001/

 The app directory is located in /home/pi/2013-IloveApis-Conf/ Each servers init script 
 that is sourced when starting is located the source directory named init_1.sh and init_2.sh.

 The init script specifies which port to bind to and the light number being controlled.


