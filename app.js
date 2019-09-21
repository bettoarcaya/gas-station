new Vue({
  el: '#app',
  data: {
    foo: 'bar',
    g1: { gasCount: 200 },
    g2: { gasCount: 300 },
    g3: { gasCount: 400 },
    element: { vehicleType: '', availableGas: 0, actualGas: 0 },
    gasStationQueueCount: 0,
  },
  methods: {
    addCarToQueue: function(){
      alert("adding car to the gas station queue");
      this.gasStationQueueCount++;
    }
  }
});
