<template>
  <div class="home">
    <div class="container">
      <a href="/#/">Back to Your Styles</a>
      <h1>Style info</h1>
      <img v-bind:src="style.image_url" />

      <div v-for="item_tag in style.item_tags">
        <!-- Button trigger modal -->
        <div>
          <button
            v-on:click="searchOnlineAPI(item_tag);"
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#onlineModal"
          >
            Find {{ item_tag.name }} online now!
          </button>
          <br />
          <button
            v-on:click="searchNearbyAPI(item_tag);"
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#nearbyModal"
          >
            Find {{ item_tag.name }} Near you right now!
          </button>

          <br />
          <br />
          <br />
        </div>

        <!--
          {{ item_tags }}

          <div v-for="item_tag in item_tags">
            <p>{{ item_tag.name }}</p>
            <p>{{ item_tag.potential_purchases }}</p>

            <a v-bind:href="'/#/Nearby' + item_tag" class="btn btn-primary">Find Nearby</a>
            <a v-bind:href="`/#/Nearby`" class="btn btn-primary">Find Online</a>

            click on the item and tag and you get a pop up (find nearby or find)


          </div>
        -->
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="onlineModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ current_item_tag.name }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <div class="row" is="transition-group" name="slide-right"></div>
          </div>
          <div class="modal-body">
            <div v-for="asos_product in asos_products" v-bind:key="asos_product.id">
              <div class="card">
                <img class="card-img-top" v-bind:src="asos_product.baseImageUrl" alt="Card image cap" />
                <div class="card-body">
                  <p class="card-title">{{ asos_product.name }}</p>
                  <p>${{ asos_product.price.current.value }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="nearbyModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="nearbyModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="nearbyModalLabel">{{ current_item_tag.name }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div>I want to show all the items from the nearby API here</div>
            <div class="modal-body">
              <div v-for="store in stores" v-bind:key="store.id">
                <div class="card">
                  <img class="card-img-top" v-bind:src="store.products[0].image" alt="Card image cap" />
                  <div class="card-body">
                    <p class="card-title">{{ store.name }}</p>
                    <p>{{ store.products[0].title }}</p>
                    <p>{{ store.locations[0].phone }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
var axios = require("axios");
export default {
  data: function() {
    return {
      // item_tags: [],
      style: {},
      products: [],
      stores: [],
      asos_products: [],
      item_tag: "",
      current_item_tag: {},
      currentSearch: {}
    };
  },
  created: function() {
    // axios.get("http://localhost:3000/api/item_tags/").then(response => {
    //   this.item_tags = response.data;
    // });
    axios.get("http://localhost:3000/api/styles/" + this.$route.params.id).then(response => {
      this.style = response.data;
    });
    // var params = {
    //   item_tag: "jumpsuit"
    // };
    // axios.get("http://localhost:3000/api/asos_products", { params: params }).then(response => {
    //   console.log(response.data);
    //   this.asos_products = response.data;
    // });
    // axios.get("http://localhost:3000/api/nearby").then(response => {
    //   console.log(response.data);
    //   this.products = response.data;
    // });
  },
  methods: {
    searchOnlineAPI: function(item_tag) {
      console.log("searchOnlineAPI", item_tag);
      this.current_item_tag = item_tag;
      let params = {
        item_tag: item_tag.name
      };
      axios
        .get("http://localhost:3000/api/asos_products", { params: params })
        .then(
          function(response) {
            console.log(response);
            // this.item_tag = "";
            this.asos_products = response.data;
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error.response.data.errors);
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    searchNearbyAPI: function(item_tag) {
      console.log("searchNearbyAPI", item_tag);
      this.current_item_tag = item_tag;
      let params = {
        item_tag: item_tag.name,
        distance: 10
      };
      axios
        .get("http://localhost:3000/api/nearby", { params: params })
        .then(
          function(response) {
            console.log(response);
            this.stores = response.data;
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
