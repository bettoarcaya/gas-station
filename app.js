new Vue({
  el: '#app',
  mounted(){

  },
  data: {
    foo: 'bar',
    g1: { gasCount: 200, p1: {vehicleType: '', actualGas: 0}, p2: {vehicleType: '', actualGas: 0} },
    g2: { gasCount: 300, p1: {vehicleType: '', actualGas: 0}, p2: {vehicleType: '', actualGas: 0} },
    g3: { gasCount: 400, p1: {vehicleType: '', actualGas: 0}, p2: {vehicleType: '', actualGas: 0} },
    element: { vehicleType: '', availableGas: 0, actualGas: 0 },
    gasStationQueueCount: 0,
    gasStationQueue: [],
  },
  methods: {
    addCarToQueue: function(){
      //alert("adding car to the gas station queue");
      /*setTimeout(function () {
        alert("Hi Bro, SetTimeout is working fine.");
      }, 1000);*/

      let elementType = Math.floor((Math.random() * (3 - 1 + 1)) + 1);
      let newElement = { vehicleType: '', availableGas: 0, actualGas: 0 };

      if(elementType == 1){
        newElement.vehicleType = 'automobile';
        newElement.availableGas = 30;
        newElement.actualGas = 10;
      }
      if(elementType == 2){
        newElement.vehicleType = 'motorcycle';
        newElement.availableGas = 20;
        newElement.actualGas = 10;
      }
      if(elementType == 3){
        newElement.vehicleType = 'van';
        newElement.availableGas = 60;
        newElement.actualGas = 10;
      }

      this.gasStationQueue.push(newElement);
      this.gasStationQueueCount++;

    },
    addToGasStation: function(){
      let gasStations = [this.g1, this.g2, this.g3];
      let queue = this.gasStationQueue;
      let freeStation = this.lookingForFreeStation(gasStations);

      if(freeStation != null && freeStation.p1.actualGas == 0){
        freeStation.p1.vehicleType = queue[0].vehicleType;
        freeStation.p1.actualGas = queue[0].actualGas;
        queue.splice(0, 1);
        this.gasStationQueueCount--;
      }else if(freeStation != null && freeStation.p2.actualGas == 0){
        freeStation.p2.vehicleType = queue[0].vehicleType;
        freeStation.p2.actualGas = queue[0].actualGas;
        queue.splice(0, 1);
        this.gasStationQueueCount--;
      }else{
        alert("there are not free stations :(");
      }

    },
    lookingForFreeStation: function(stations){
      for (let i = 0; i < stations.length; i++) {
        if(stations[i].p1.actualGas == 0 || stations[i].p2.actualGas == 0){
          return stations[i];
        }
      }
      return null;
    },
  }
});
