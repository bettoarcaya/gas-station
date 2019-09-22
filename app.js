new Vue({
  el: '#app',
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
    //method to add a element in the gas station queue
    addCarToQueue: function(){

      let elementType = Math.floor((Math.random() * (3 - 1 + 1)) + 1);
      let newElement = { vehicleType: '', availableGas: 0, actualGas: 0 };

      //creating a random elment to push in the gas station queue
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

      //pushing the element to the gas station queue
      this.gasStationQueue.push(newElement);
      this.gasStationQueueCount++;

    },
    //method to add an element in the gas station
    addToGasStation: function(){

      let gasStations = [this.g1, this.g2, this.g3]; //mutations from the original element
      let queue = this.gasStationQueue; //mutations from the original element
      let freeStation = this.lookingForFreeStation(gasStations);

      //monitoring the resources to access only in the available one...
      if(freeStation != null && freeStation.p1.actualGas == 0 && freeStation.gasCount > 0){
        freeStation.p1.vehicleType = queue[0].vehicleType;
        freeStation.p1.actualGas = queue[0].actualGas;
        queue.splice(0, 1);
        this.gasStationQueueCount--;
        this.operate(freeStation, queue[0]);
      }else if(freeStation != null && freeStation.p2.actualGas == 0 && freeStation.gasCount > 0){
        freeStation.p2.vehicleType = queue[0].vehicleType;
        freeStation.p2.actualGas = queue[0].actualGas;
        queue.splice(0, 1);
        this.gasStationQueueCount--;
        this.operate(freeStation, queue[0]);
      }else{
        alert("there are not free stations yet, you must wait in the queue...");
      }

    },
    //checking all the resources and return the available one or null instead
    lookingForFreeStation: function(stations){
      for (let i = 0; i < stations.length; i++) {
        if(stations[i].gasCount > 0 && (stations[i].p1.actualGas == 0 || stations[i].p2.actualGas == 0)){
          return stations[i];
        }
      }
      return null;
    },
    //the normal operation of the resources
    operate: function(fGasStation, element){

      let count = ( element.availableGas - element.actualGas);

      if(count < fGasStation.gasCount){
        fGasStation.gasCount -= count;
        element.actualGas = element.availableGas;
      }else{
        element.actualGas += fGasStation.gasCount;
        fGasStation.gasCount = 0;
      }

    },
    //releasing the necessary resources to be used by another element
    clearGasStation: function(){
      let stations = [this.g1, this.g2, this.g3];
      for (let i = 0; i < stations.length; i++) {
        if(stations[i].p1.actualGas != 0 || stations[i].p2.actualGas != 0){
          this.clear(stations[i]);
          this.checkEmptyStations(stations);
        }
      }
    },
    //setting all the elements in their default values
    clear: function(gasStation){
      gasStation.p1.vehicleType = '';
      gasStation.p1.actualGas = 0;

      gasStation.p2.vehicleType = '';
      gasStation.p2.actualGas = 0;
    },
    //filling in all the resources to be used
    reFillGasStation: function(){
      let stations = [this.g1, this.g2, this.g3];
      for (let i = 0; i < stations.length; i++) {
        if(stations[i].gasCount == 0 || stations[i].gasCount < 400){
          stations[i].gasCount = 400;
        }
      }
    },
    checkEmptyStations: function(stations){
      for (let i = 0; i < stations.length; i++) {
        if(stations[i].gasCount == 0){
          alert("filling empty gas station :)" );
          stations[i].gasCount = 400;
        }
      }
    }
  }
});
