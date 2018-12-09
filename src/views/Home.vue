<template>
  <div class="home">
    <h1>{{ message }}</h1>

    <button v-on:click="createStyle();" class="btn btn-primary">Copy an image link to add a new style</button> Image:
    <input v-model="newStyleImage" type="text" />

    <form v-on:submit.prevent="submit();">
      <h2>Upload a style</h2>
      <div>Image: <input type="file" v-on:change="setFile($event);" ref="fileInput" /></div>
      <input type="submit" value="Submit" />
    </form>

    <div v-for="style in styles">
      <img v-bind:src="style.image_url" /> <span v-on:click="style_id = style.id;"></span>
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
            <button v-on:click="createItemTag();" class="btn btn-primary">Search for your Items</button>
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
      itemTags: [],
      newItemTag: [],
      image: "",
      user_id: 0,
      style_id: 0
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
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    submit: function() {
      var formData = new FormData();
      formData.append("image", this.image);

      axios.post("http://localhost:3000/api/styles", formData).then(response => {
        this.$refs.fileInput.value = "";
      });
    },
    createItemTag: function() {
      let params = {
        name: this.newItemTag,
        user_id: this.user_id,
        style_id: this.style_id
      };
      axios
        .post("http://localhost:3000/api/item_tags", params)
        .then(
          function(response) {
            console.log(response);
            this.itemTags.push(response.data);
            this.newItemTag = "";
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error.response.data.errors);
            this.errors = error.response.data.errors;
          }.bind(this)
        );
      window.location.href = `"/#/styles/" + style_id`;
    },
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
