<template>
  <div class="home">
    <h1>{{ message }}</h1>

    <button v-on:click="createStyle();" class="btn btn-primary">Upload a new style</button> Image:
    <input v-model="newStyleImage" type="text" />

    <div v-for="style in styles">
      <img v-bind:src="style.image_url" />
      <p>url: {{ style.image_url }}</p>
      <button
        v-on:click="showStyle(style);"
        type="button"
        class="btn btn-primary"
        data-toggle="modal"
        data-target=".bd-example-modal-lg"
      >
        Tag Your Style
      </button>
    </div>
    <div
      class="modal fade bd-example-modal-lg"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myLargeModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <h1>Add Your Tags to Find Your Items</h1>

          <!--
            <div><img src="style.image_url" /></div>
            <p>{{ style.item_tags }}</p>
          -->
          <form>
            <input v-model="newItemTag" type="text" /> Item Tag<br />
            <!--
              <input v-model="newItemTag" type="text" /> Item Tag<br />
              <input v-model="newItemTag" type="text" /> Item Tag<br />
              <input v-model="newItemTag" type="text" /> Item Tag<br />
              <input v-model="newItemTag" type="text" /> Item Tag<br />
            -->
            <button v-on:click="createItemTag(style);" class="btn btn-primary">Search for your Items</button>
            <!-- <a href="/#/styles/1" class="btn btn-primary">Go somewhere</a> -->
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
let axios = require("axios");
export default {
  data: function() {
    return {
      message: "Welcome to Shop.Dream!",
      styles: [],
      newStyle: {},
      newStyleImage: "",
      itemTags: []
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
    showStyle: function(style) {
      this.newStyle = style;
    },
    createItemTag: function(style) {
      let params = {
        name: this.newItemTag,
        style_id: style.id
      };
      axios
        .post("http://localhost:3000/api/item_tags", params)
        .then(
          function(response) {
            console.log(response);
            this.itemTags.push(response.data);
            this.newItemTag = "";
            this.$router.push("/item_tags/" + style.id);
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error.response.data.errors);
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    createStyle: function() {
      let params = {
        image_url: this.newStyleImage
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
