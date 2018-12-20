<template>
  <div class="home">

    <div class="left">
    <div class="container">
      <div class="row">
        <div class="col s12 m6">
          <div class="card">
            <div class="card-image">
              <img v-bind:src="style.image ? style.image : style.image_url" /> <span class="card-title"></span>
              <a class="btn-floating halfway-fab waves-effect waves-light red"><i class="material-icons">add</i></a>
            </div>
            <div class="card-content">
              <div v-for="item_tag in style.item_tags">
                <ul class="collection">
                  <li class="collection-item avatar">
                    <i class="material-icons circle">loyalty</i> <span class="title"> {{ item_tag.name.toUpperCase() }} </span>

                    <div>
                      <p>
                        <a
                          href="#!"
                          class="secondary-content"
                          v-on:click="searchNearbyAPI(item_tag), setMapMarkers(stores);"
                          data-toggle="modal"
                          data-target="#nearbyModal"
                        >
                          <!-- <i class="material-icons">location_on</i> --></a
                        >

                        <button
                          data-target="nearby-modal"
                          class="btn modal-trigger"
                          v-on:click="searchNearbyAPI(item_tag), setMapMarkers(stores);"
                        >
                        Find Nearby 
                          
                        </button>

                        <a
                          href="#!"
                          class="content"
                          v-on:click="searchOnlineAPI(item_tag);"
                          data-toggle="modal"
                          data-target="#onlineModal"
                        >
                          <!-- <i class="material-icons">redeem</i> --></a>

                        <!-- Modal Trigger -->
                        <button
                          class="btn modal-trigger"
                          v-on:click="searchOnlineAPI(item_tag);"
                          data-target="asos-modal"
                        >
                          Find Online
                        </button>
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

</div>
    <!-- Online Modal Structure -->
    <div id="asos-modal" class="modal">
      <div class="modal-content">
        <h4>{{ current_item_tag.name }}</h4>


  <div class="row" v-for="asos_product in asos_products" v-bind:key="asos_product.id">
    <div class="col s12 m7">
      <div class="card">
        <div class="card-image">
          <img v-bind:src="asos_product.baseImageUrl">
          <span class="card-title">{{ asos_product.name }}</span>
        </div>
        <div class="card-content">
          <p>${{ asos_product.price.current.value }}</p>
            <a v-bind:href="`https://us.asos.com/${asos_product.url}`" class="btn btn-primary" target="_blank"> Buy This!</a>
              <i class="material-icons right">favorite_border</i>
        </div>
      </div>
    </div>
  </div>





      </div>
      <div class="modal-footer"><a class="modal-close waves-effect waves-green btn-flat">Close</a></div>
    </div>


    <!-- Nearby Modal Structure -->
    <div id="nearby-modal" class="modal">
      <div class="modal-content">
        <h4>{{ current_item_tag.name }}</h4>
        <span><div id="map"></div></span>

          <div class="row" v-for="store in stores" v-bind:key="store.id">
    <div class="col s10 m7">
      <div class="card">
        <div class="card-image">
          <img v-bind:src="store.products[0].image">
        </div>
        <i class="material-icons right">favorite_border</i>
        <div class="card-content">
          <p>{{ store.products[0].title }}</p>
                        <p>${{ store.products[0].price }}</p>
                        <p>{{ store.name }}</p>
              <p>{{ store.locations[0].phone }}</p>
                <p> {{ store.locations[0].address }} </p>
                    
        </div>
      </div>
    </div>
  </div>
        <div class="modal-footer"><a class="modal-close waves-effect waves-green btn-flat">Close</a></div>
      </div>
    </div>
  </div>
</template>

<style>
p {
  font-size: 24px;
}
#map {
  height: 500px;
  width: 100%;
  text-align: left;
}

img.resize {
  max-width: 300px;
}

canvas.mapboxgl-canvas {
  width: 100%;
  height: 500px;
}

img.small {
  width: 50%;
  height: 300px;
}

#collection {
  max-width: 100px;
}

div.col.s10.m7 {
  width: 100%;
}

div.col.s12.m6 {
  width: 100%;
  padding: 2px 0px 0px 0px;
}

div.col.s12.m7 {
  width: 100%;
}

.modal {
  max-width: 500px;
}

#marker {
  background-image: url("https://www.mapbox.com/mapbox-gl-js/assets/washington-monument.jpg");
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.mapboxgl-popup {
  max-width: 200px;
}

div.product-card {
  max-width: 400px;
}
</style>

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
      currentSearch: {},
      places: [
        { lat: 41.87, lng: -87.62, description: "A place in Australia" },
        { lat: 42, lng: 88, description: "The main city!" }
      ]
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
  mounted: function() {
    var elems = document.querySelectorAll(".modal");
    var instances = M.Modal.init(elems);
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYXNobGV5YWJyYW1vMiIsImEiOiJjanBoYzhkZXkwYzhnM2tqc2I1aGtjMWdhIn0.Qxaxlrd5QPSxZ9wn_WhE_Q";
    // process.env.VUE_APP_MAPBOX_KEY;
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v10", // stylesheet location
      center: [this.places[0].lng, this.places[0].lat], // starting position [lng, lat]
      zoom: 10 // starting zoom
    });

    this.places.forEach(function(place) {
      var popup = new mapboxgl.Popup({ offset: 25 }).setText("go to this store");
      var marker = new mapboxgl.Marker()
        .setLngLat([place.lng, place.lat])
        .setPopup(popup)
        .addTo(map);
    });
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
    },
    setMapMarkers: function(stores) {
      console.log(stores);
      this.current_stores = stores;
      let params = {
        lat: stores.locations.lat,
        lng: stores.locations.lng
      };
      axios.get("http://localhost:3000/api/nearby", { params: params }).then(
        function(response) {
          this.stores = response.data;
        }.bind(this)
      );
    }
  },
  computed: {}
};
</script>
