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
                <a href="/#/login"><i data-target="dropdown1" class="material-icons">person_outline</i></a>

                <ul id="dropdown1" class="dropdown-content">
                  <li><a href="#!">one</a></li>
                  <li><a href="#!">two</a></li>
                  <li class="divider" tabindex="-1"></li>
                  <li><a href="#!">three</a></li>
                  <li>
                    <a href="#!"><i class="material-icons">view_module</i>four</a>
                  </li>
                  <li>
                    <a href="#!"><i class="material-icons">cloud</i>five</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="/#/"><i class="material-icons">style</i></a>
              </li>
              <li>
                <a href="mobile.html"><i class="material-icons">more_vert</i></a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <a href="/#/signup"> | Signup</a> <a href="/#/login"> | Login</a> <a href="/#/logout"> | Logout</a>
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
</style>

<script>
// method: var instance = M.Dropdown.getInstance(elem);
</script>
