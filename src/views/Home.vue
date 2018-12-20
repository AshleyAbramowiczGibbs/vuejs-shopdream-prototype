<template>
  <div class="home">

    <div class="left">
    <div>
      <ul class="collapsible">
        <li>
          <div class="collapsible-header"><i class="material-icons">add_a_photo</i> Add a Style</div>
          <div class="collapsible-body">
            <div class="row">
              <form class="col s12">
                <div class="row">
                  <div class="input-field col s12">
                    <i class="material-icons prefix">linked_camera</i>
                    <input id="icon_prefix" v-model="newStyleImage" type="text" class="validate" />
                    <label for="icon_prefix">Paste an image link of a style you need!</label>

                    <button v-on:click="createStyle();" class="btn btn-primary">Add Image</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </li>
        <li>
          <div class="collapsible-header"><i class="material-icons">cloud_upload</i> Upload a Style</div>
          <div class="collapsible-body">
            <form v-on:submit.prevent="submit();">
              <div><input class="btn btn-primary" type="file" v-on:change="setFile($event);" ref="fileInput" /></div>
              <input class="btn btn-primary" type="submit" value="ADD IMAGE" />
            </form>
          </div>
        </li>
      </ul>
    </div>

    <div v-for="style in orderBy(styles, 'id', -1)">
      <div class="card">
        <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" v-bind:src="style.image ? style.image : style.image_url" />
        </div>
        <div class="card-content">
          <span class="card-title activator grey-text text-darken-4"> </span>
         <!--  <button
            v-on:click="showStyle(style);"
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target=".bd-example-modal-lg"
          >
            Tag Your Style
          </button> -->

            <!-- Item Tag Modal Trigger -->
          <a v-on:click="setCurrentStyle(style);" class="waves-effect waves-light btn modal-trigger" href="#modal-new-tag">
            Tag your style
          </a>

          <a v-on:click="setCurrentStyle(style);" v-bind:href="`/#/styles/${style.id}`" class="btn btn-primary"> Buy this Look! </a>
           <i class="material-icons right">favorite_border</i>

          <div>
            <div v-for="item_tag in style.item_tags "class="chip">
              {{ item_tag.name }} <i class="close material-icons">close</i>
            </div>
          </div>

        </div>
          <!-- <div
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
                <form v-on:submit.prevent="createItemTag();">
                  <input v-model="newItemTag" type="text" /> Item Tag<br />
                  <button type="submit" class="btn btn-primary">Search for your Items</button>
                </form>
              </div>
            </div>
          </div> -->
        </div>
      </div>
      </div>

      <!-- Item Tag Modal Structure -->
      <div id="modal-new-tag" class="modal">
        <div class="modal-content">
          <h4>Add Your Tags</h4>
            <ul>
              <li class="text-danger" v-for="error in errors">{{ error}}</li>
            </ul>
            <form v-on:submit.prevent="createItemTag();">
              <input v-model="newItemTag" type="text" />
              <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
        <div class="modal-footer">
          <a class="modal-close waves-effect waves-green btn-flat">Close</a>
        </div>
      </div>

    </div>
</template>

<style>
div.left {
  padding: 3% 2% 0% 0%;
  max-width: 1000px;
}
i.material.icons.right {
  position: right;
}

a.waves-effect {
  margin: 10px 20px 20px 0px;
}

a.btn {
  margin: 10px 20px 20px 0px;
}
img.medium {
  width: 380px;
  height: 530px;
}

ul.collapsible {
  margin: 10px 0px 20px 0px;
}

div.instragram {
  width: 400px;
  vertical-align: middle;
}

iframe {
  height: 9000px;
}

button.btn-primary {
  margin: 11px;
}
</style>

<script>
/* global M */
let axios = require("axios");
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
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
      errors: [],
      chips: {
        tag: "chip content"
      }
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
  mounted: function() {
    var elems = document.querySelectorAll(".collapsible");
    var instances = M.Collapsible.init(elems);
    var elemsChips = document.querySelectorAll(".chips");
    var instancesChips = M.Chips.init(elemsChips);
    var elemsModal = document.querySelectorAll(".modal");
    var instancesModal = M.Modal.init(elemsModal);
  },
  methods: {
    showStyle: function(style) {
      this.newStyle = style;
    },

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
            this.currentStyle.item_tags.push(response.data);
            // CLOSE THE MODAL
            // $(".bd-example-modal-lg").modal("hide");
            // var instance = M.Modal.getInstance("#modal-new-tag");
            // instance.close();
            $(".modal").modal("close");

            // REDIRECT?
            // console.log("GONNA CHANGE PAGE", this.currentStyle.id);
            // window.location.href = "/#/styles/" + this.currentStyle.id;
            // this.$router.push("/styles/" + this.currentStyle.id);
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
