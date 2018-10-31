# homebridge-wio-relay

Homebridge plugin to activate a Wio Link relay momentarily (functions as a momentary "push button" for something like garage door opener).

## Installation

Naturally...
```
npm install -g homebridge-wio-relay
```

## Configuration

Add this to your `~/.homebridge/config.json` as an accessory:
```
{
  "accessory": "WioRelay",
  "name": "Garage Door",
  "onCommand": "https://us.wio.seeed.io/v1/node/GroveRelayD0/onoff/1?access_token=YOUR_GROVE_ACCESS_TOKEN",
  "offCommand": "https://us.wio.seeed.io/v1/node/GroveRelayD0/onoff/0?access_token=YOUR_GROVE_ACCESS_TOKEN",
  "duration": 1000
}
```
