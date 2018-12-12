<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      <div>
        <nav>
          <div class="nav-wrapper">
            <a href="#!" class="brand-logo"> shop.Dream </a>
            <ul class="right hide-on-med-and-down">
              <li>
                <a href="sass.html"><i class="material-icons">favorite_border</i></a>
              </li>
              <li>
                <a href="badges.html"><i class="material-icons">person_outline</i></a>
              </li>
              <li>
                <a href="collapsible.html"><i class="material-icons">refresh</i></a>
              </li>
              <li>
                <a href="mobile.html"><i class="material-icons">more_vert</i></a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <a href="/#/signup"> | Signup</a> <a href="/#/login"> | Login</a> <a href="/#/logout"> | Logout</a>
      <a href="/#/OnlineShopping"> | Shop Online</a>
    </div>
    <router-view />
  </div>
</template>

<style>
body {
  background-color: #f5f5f5;
}

nav {
  background-color: #ffff;
}

a.brand-logo {
  color: #212121;
  font-family: Pacifico;
}

i.material-icons {
  color: #212121;
}
</style>
