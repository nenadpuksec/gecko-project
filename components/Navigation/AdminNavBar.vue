<template>
<div>
  <b-navbar toggleable="lg" type="dark" class="admin-navbar">
    <b-navbar-brand href="/admin">Admin Panel</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
            <b-nav-item>
                <nuxt-link to="/admin/posts">
                    Posts section
                </nuxt-link>
            </b-nav-item>
            <b-nav-item>
                <nuxt-link to="/admin/comments">
                    Comments section
                </nuxt-link>
            </b-nav-item>
            <b-nav-item>
                <nuxt-link to="/admin/carousel">
                    Carousel section
                </nuxt-link>
            </b-nav-item>
            <b-nav-item>
                <nuxt-link to="/">
                        <b-icon-house></b-icon-house>
                </nuxt-link>
            </b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!--<b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form>-->

        <!--<b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>-->

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item @click="onLogout">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>

<script>
export default {
    methods: {
        onLogout() {
        this.$store.dispatch('logout')
        this.$router.push('/admin/auth')
        }
    }
}
</script>

<style scoped>
.nav-link a {
    text-decoration: none;
    color: white;
}

.nav-link a:hover {
    text-decoration: none;
    color: #cccccc;
}

.admin-navbar {
    background-color: black
}
</style>