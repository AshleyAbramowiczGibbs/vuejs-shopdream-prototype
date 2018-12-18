<template>
  <div id="app">
    <div id="nav">
      <router-link to="/"></router-link>
      <div>
        <nav>
          <div class="nav-wrapper">
            <a href="#/" class="brand-logo"> shop.Dream </a>
            <ul class="right">
              <li>
                <a href="/#/"><i class="material-icons">favorite_border</i></a>
              </li>
              <li>
                <a href="/#/"><i class="material-icons">person_outline</i> </a>
              </li>

              <a class="dropdown-trigger btn" href="#" data-target="dropdown1">Login</a>

              <ul id="dropdown1" class="dropdown-content">
                <li><a href="/#/login">Login</a></li>
                <li><a href="/#/signup">Signup</a></li>
                <li><a href="/#/logout">Logout</a></li>
              </ul>
              <li>
                <a href="/#/"><i class="material-icons">style</i></a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>

    <!-- InstaWidget -->
<div class="right">
    <div src="https://instawidget.net/v/tag/LTKstyletip" id="link-06702a0fd52090f2bbb357fa5a4320c6faa487d2d83aba1c41df04e1ab21ffbb">
   </div>

 </div>

    <router-view />
  </div>
</template>

<style>
 {
  box-sizing: border-box;
}

/* Create two unequal columns that floats next to each other */
.column {
  float: left;
  padding: 10px;
}

.left {
  width: 75%;
}

.right {
  width: 25%;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

<body > body {
  background-color: #f5f5f5;
}

nav {
  background-color: #ffff;
  height: 100px;
  width: 100%;
}

a:hover {
  text-decoration: none;
}

a.brand-logo {
  color: #212121;
  font-family: Pacifico;
  padding: 10px 0px 20px 50px;
}

i.material-icons {
  color: #212121;
  font-size: 40px;
  /*  padding: 10px 0px 20px 20px;*/
}

div.home {
  padding: 0% 20% 0% 20%;
}

label {
  padding: 0px 0px 0px 10px;
}

div#link-06702a0fd52090f2bbb357fa5a4320c6faa487d2d83aba1c41df04e1ab21ffbb {
  margin: 40px 0px 0px 0px;
}

button {
  margin: 14px;
}
</style>

<script>
export default {
  data: function() {
    return {
      message: "Welcome to Vue.js!"
    };
  },
  mounted: function() {
    var elems = document.querySelectorAll(".dropdown-trigger");
    var instances = M.Dropdown.init(elems);
  },
  created: function() {},
  methods: {},
  computed: {}
};
</script>
