<template>
  <div class="about">
    <h1>Find the Style Nearby</h1>
      <div id='map'></div>
  </div>
</template>

    <style>
        body { margin:20; padding:20; }
        #map { 
          height: 400px; 
          width:100%;
        }
    </style>



<script>
  export default {
    mounted: function() {
    mapboxgl.accessToken = 'pk.eyJ1IjoicGV0ZXJ4amFuZyIsImEiOiJjam94YWZieXExYnQ0M3BucXZwbmV2Y2VsIn0.pmLbX0YPw86c5r8YlyZr7w';
      var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v9', // stylesheet location
  center: [-74.50, 40], // starting position [lng, lat]
   zoom: 11 // starting zoom
   });
    },
  };
</script>