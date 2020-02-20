<template>
<div class="header-container">
  <header class="the-header">
    <TheSideNavToggle @toggle="$emit('sidenavToggle')" />
    <div class="logo">
      <nuxt-link to="/">Metric: </nuxt-link>
      <nuxt-link to="/"> Kelvin</nuxt-link>
      <nuxt-link to="/"> Celsius</nuxt-link>
      <nuxt-link to="/"> Fahreheit</nuxt-link>
    </div>
    <div class="spacer"></div>
    <div class="navigation-items">
      <ul class="nav-list">
        <li class="nav-item">
          <b-form-select v-model="selected" :options="options.text">
            <b-form-select-option v-for="(option,index) in options" :key="index" :value="option.value">{{ option.text }}</b-form-select-option>
          </b-form-select></li>
      </ul>
    </div>
  </header>
</div>
</template>

<script>
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";

export default {
  name: "TheHeader",
  components: {
    TheSideNavToggle
  },
  data() {
    return {
      selected: null,
      options: [
        { value: 'e', text: 'English' },
        { value: 's', text: 'Serbian' },
        { value: 'g', text: 'German' }
      ]
    }
  }
};
</script>


<style scoped>
.header-container {
  height: 60px;
}

.the-header {
  width: 80%;
  /*position: fixed;*/
  margin: 0px auto;
  height: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /*background-color: black;*/
  z-index: 100;
  box-sizing: border-box;
  padding: 0 20px;
}

.logo {
  margin: 0 10px;
  font-size: 1.3rem;
}

.logo a {
  text-decoration: none;
  color: white;
}

.spacer {
  flex: 1;
}

.navigation-items {
  display: none;
}

@media (min-width: 768px) {
  .navigation-items {
    display: block;
  }
}

@media (max-width: 768px) {
  .the-header {
    width: 100%
  }
  .logo {
    visibility: hidden;
  }
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
  margin: 0 10px;
}

.nav-item a {
  text-decoration: none;
  color: white;
}

.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: red;
}
</style>
