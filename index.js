var request = require('request');

var Service, Characteristic;

module.exports = function(homebridge){
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory('homebridge-wio-relay', 'WioRelay', WioRelayAccessory);
}

function WioRelayAccessory(log, config) {
  this.log = log;
  this.name = config['name'] || 'Wio Relay'
  this.onCommand = config['onCommand'] || '';
  this.offCommand = config['offCommand'] || '';
  this.duration = config['duration'] || 1000;
}

WioRelayAccessory.prototype = {

  setPowerState: function(powerOn, callback) {
    var self = this;
    this.log('Sending command to \'' + this.name + '\'...');
    
    this.changeState(1, function(err) {
      if (err) return callback(err);

      setTimeout(function() {
        self.changeState(0, callback);
      }, self.duration);
    });
  },

  changeState: function(state, callback) {
    var self = this;
    request
      .post(state ? this.onCommand : this.offCommand)
      .on('response', function(response) {
        callback(response.statusCode == 200 ? null : 'Error changing state of `' + self.name + '`to `' + (state ? 'on' : 'off') + '`.');
      });
  },

  identify: function(callback) {
    this.log('Identifying ' + this.name + '...');
    callback(null, this.name);
  },

  getServices: function() {
    var switchService = new Service.Switch(this.name);

    switchService
      .getCharacteristic(Characteristic.On)
      .on('set', this.setPowerState.bind(this));

    return [switchService];
  }
};
