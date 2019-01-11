<template>
  <div class="home">
    <div>
      <h3 class="title">Tags Users are Searching</h3>
      <canvas id="tagsChart"></canvas>
    </div>

    <div class="spacing-two"></div>
  </div>
</template>

<style>
h3.title {
  text-align: center;
  padding: 20px;
}

.spacing-two {
  height: 1000px;
}
</style>

<script>
import Chart from "chart.js";
let axios = require("axios");
export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!"
    };
  },
  created: function() {},
  method: function() {},
  mounted: function() {
    axios.get("https://intense-earth-34277.herokuapp.com/api/item_tags").then(
      function(response) {
        this.item_tags = response.data;
      }.bind(this)
    );
    var ctx = document.getElementById("tagsChart").getContext("2d");
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "doughnut",

      // The data for our dataset
      data: {
        labels: ["shoes", "sweater", "dress", "hats", "winter coat", "jumpsuit", "jeans"],
        datasets: [
          {
            label: "Tags",
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgb(255, 99, 132)"
            ],
            borderColor: "rgb(255, 99, 132)",
            data: [4, 7, 9, 20, 20, 30, 45]
          }
        ]
      },

      // Configuration options go here
      options: {}
    });
  },
  computed: {}
};
</script>
