<template>
  <div class="home">
    <h1>{{ message }}</h1>

      <button v-on:click="createStyle()" class="btn">Upload a new style</button>
      Image: <input v-model="newStyleImage" type="text">

      <div v-for="style in styles">
        <img v-bind:src="style.image_url">
        <p>url: {{ style.image_url }}</p>
        
      </div>
      
  </div>
</template>

<style>
</style>

<script>
let axios = require("axios");
export default {
  data: function() {
    return {
      message: "Welcome to Shop.Dream!",
      styles: [],
      newStyle: {},
      newStyleImage: ""

    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/styles").then(
      function(response) {
        console.log(response.data);
        this.styles = response.data;
      }.bind(this)
    );
  },
  methods: {
    createStyle: function() {
      let params = {
        image_url: this.newStyleImage,
        user_id: 1
      };
      axios
        .post("http://localhost:3000/api/styles", params)
        .then(
          function(response) {
            console.log(response);
            this.styles.push(response.data);
            this.newStyleImage = "";
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error.response.data.errors);
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  },

  computed: {}
};
</script>