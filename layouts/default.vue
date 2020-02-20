<template>
  <div>
    <section class="intro">
      <TheHeader @sidenavToggle="displaySidenav = !displaySidenav" />
        <h1>OPEN WEATHER</h1>
        <div class="input-group md-form form-sm form-2 pl-0">
          <input v-model="location" class="form-control my-0 py-1 red-border" type="text" placeholder="Enter location, City, Country or ZIP code" aria-label="Search">
          <div class="input-group-append" style="cursor: pointer" @click="findLocation(location)">
            <span class="input-group-text red lighten-3" id="basic-text1">
              <i class="fas fa-search text-grey"
            aria-hidden="true">
            Search
              </i>
            </span>
          </div>
        </div>
        <nuxt-link to="/"><div class="back-arrow"></div></nuxt-link>
    </section>
    <TheSidenav
      :show="displaySidenav"
      @close="displaySidenav = false" />
    <nuxt />
  </div>
</template>

<script>
import Axios from 'axios'
import TheHeader from '@/components/Navigation/TheHeader'
import TheSidenav from '@/components/Navigation/TheSidenav'

export default {
  components:{
    TheHeader,
    TheSidenav
  },
  data(){
    return{
      displaySidenav: false,
      location: '',
      singlePlaceData: {
        temp: '', 
        humidity: '', 
        wind: '',
        icon: '',
        description: '' 
      }
    }
  },
  methods: {
    findLocation(cityName) {
      
      Axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&appid=befe8baaa2bf08c42633d6903700839c')
          .then(res => { //' + this.city.country + '
            const postsArray = []
            for (const key in res.data) {
              postsArray.push({ ...res.data[key] })
            }
            const temp = postsArray[0].lat
            const humidity = postsArray[3].humidity
            const wind = postsArray[5].speed
            const icon = require(`~/assets/images/${postsArray[1][0].icon}.png`)
            const description = postsArray[1][0].description
            this.singlePlaceData.temp = temp
            this.singlePlaceData.humidity = humidity
            this.singlePlaceData.wind = wind
            this.singlePlaceData.icon = icon
            this.singlePlaceData.description = description
          })
          .catch(e => context.error(e));
          console.log(this.singlePlaceData)
          this.$router.push({ params: { city: location }, path: 'single' })
    }
  }
}
</script>

<style>

  .input-group {
    width: 30% !important;
    margin: 0px auto;
  }

  .intro {
    height: 500px;
    position: relative;
    padding: 30px 30px 30px 0px;
    box-sizing: border-box;
    background-image: url('~assets/images/background-1440.png');
    text-align: center;
    background-position: center;
    background-size: auto;
  }

  .intro h1 {
    font-family: 'Lato', sans-serif;
    width: auto;
    text-align: center;
    font-size: 60px !important;
    color: white;
    padding: 10px;
    border-radius: 10px;
  }

  @media (min-width: 768px) {
    .intro h1 {
      font-size: 2rem;
    }
  }

  @media (max-width: 768px) {
    .input-group {
      width: 90% !important;
      margin: 0px auto !important;
    }
  }

  .featured-posts {
    display: flex;
    padding: 20px;
    box-sizing: border-box;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .post-main-list {
    width: 89%;
  }

  html {
    font-family: 'Open Sans', sans-serif;
  }

  body {
    margin: 0;
  }
</style>
