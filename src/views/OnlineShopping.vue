<template>
  <div class="onlineshopping">
    <div class="container">
      <a href="/#/">Back to Your Styles</a>
      <h1>Find the Item Online</h1>

      {{ asos_products }}
    </div>
  </div>
</template>

<style></style>

<script>
let axios = require("axios");
export default {
  data: function() {
    return {
      asos_products: []
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/asos_products").then(
      function(response) {
        console.log(response.data);
        asos_products = response.data;
      }.bind(this)
    );
</script>
