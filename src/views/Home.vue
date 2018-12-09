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
      <img class="medium" v-bind:src="style.image_url" />
      <p>url: {{ style.image_url }}</p>
      <button
        v-on:click="setCurrentStyle(style);"
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

          <ul>
            <li class="text-danger" v-for="error in errors">{{ error }}</li>
          </ul>
          <!--
            <div><img src="style.image_url" /></div>
            <p>{{ style.item_tags }}</p>
          -->
          <form v-on:submit.prevent="createItemTag();">
            <input v-model="newItemTag" type="text" /> Item Tag<br />
            <!--
              <input v-model="newItemTag" type="text" /> Item Tag<br />
              <input v-model="newItemTag" type="text" /> Item Tag<br />
              <input v-model="newItemTag" type="text" /> Item Tag<br />
              <input v-model="newItemTag" type="text" /> Item Tag<br />
            -->
            <button type="submit" class="btn btn-primary">Search for your Items</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
img.medium {
  width: 380px;
  height: 530px;
}
</style>

<script>
let axios = require("axios");
export default {
  data: function() {
    return {
      message: "Welcome to Shop.Dream!",
      styles: [],
      currentStyle: {},
      newStyleImage: "",
      itemTags: [],
      newItemTag: [],
      image: "",
      style_id: 0,
      errors: []
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
    setCurrentStyle: function(style) {
      this.currentStyle = style;
    },
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image = event.target.files[0];
      }
    },
    submit: function() {
      let params = {
        image_url: this.image
      };

      axios.post("http://localhost:3000/api/styles", params).then(
        function(response) {
          console.log(response);
          this.styles.push(response.data);
          this.$refs.fileInput.value = "";
        }.bind(this)
      );
    },
    createItemTag: function() {
      let params = {
        name: this.newItemTag,
        style_id: this.currentStyle.id
      };
      console.log("params", params);
      axios
        .post("http://localhost:3000/api/item_tags", params)
        .then(
          function(response) {
            console.log(response);
            this.itemTags.push(response.data);
            this.newItemTag = "";
            console.log("GONNA CHANGE PAGE", this.currentStyle.id);
            // window.location.href = "/#/styles/" + this.currentStyle.id;
            $(".bd-example-modal-lg").modal("hide");
            this.$router.push("/styles/" + this.currentStyle.id);
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
