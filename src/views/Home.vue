<template>
  <div class="home">
    <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s6">
            <i class="material-icons prefix">linked_camera</i>
            <input id="icon_prefix" v-model="newStyleImage" type="text" class="validate" />
            <label for="icon_prefix">Paste an image link of a style you need!</label>

            <button v-on:click="createStyle();" class="btn btn-primary">Add Image</button>
          </div>
        </div>
      </form>
    </div>

    <form v-on:submit.prevent="submit();">
      <div>
        Upload a Style <input class="btn btn-primary" type="file" v-on:change="setFile($event);" ref="fileInput" />
      </div>
      <input class="btn btn-primary" type="submit" value="ADD IMAGE" />
    </form>

    <div v-for="style in styles">
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" v-bind:src="style.image ? style.image : style.image_url" />
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4"
            >Card Title<i class="material-icons right">more_vert</i></span
          >
          <p>url: {{ style.image_url }}</p>
          <p>url2: {{ style.image }}</p>
        </div>
        <div class="card-reveal">
          <span class="card-title grey-text text-darken-4">Card Title<i class="material-icons right">close</i></span>
          <p>Here is some more information about this product that is only revealed once clicked on.</p>

          <a v-bind:href="`/#/styles/${currentStyle.id}`" class="btn btn-primary"> (Broken) Style Show </a>
        </div>
      </div>
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

.card {
  max-width: 600px;
  flex-grow: 1;
  vertical-align: middle;
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
      // let params = {
      //   image_url: this.image
      // };
      var formData = new FormData();
      formData.append("image", this.image);

      axios.post("http://localhost:3000/api/styles", formData).then(
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
