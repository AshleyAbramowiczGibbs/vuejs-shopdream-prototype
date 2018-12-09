<template>
  <div class="about">
    <h1>Find the Style Nearby</h1>
    <div id="map"></div>

    <p>{{ stores.locations[0].lng }}</p>
    <p>{{ stores.locations[0].lng }}</p>
  </div>
</template>

<style>
body {
  margin: 20;
  padding: 20;
}
#map {
  height: 400px;
  width: 100%;
}
</style>

<script>
export default {
  data: function() {
    return {
      lat: 0,
      lng: 0
    };
  },
  mounted: function() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYXNobGV5YWJyYW1vMiIsImEiOiJjam96MWthbG8ycDk5M2ttbzlxeGF2bjRpIn0.sWcXeBu7CQ3vipEFwj8wcA";
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v9", // stylesheet location
      center: [lat, lng], // starting position [lng, lat]
      zoom: 11 // starting zoom
    });
  }
};
</script>
