<template>
  <div class="home-page">
    <CityWeatherList :cities="cities" />
  </div>
</template>

<script>
import CityWeatherList from '@/components/Main/CityWeatherList'

export default {
  data() {
    return {
      cities: [
        {name: "Belgrade", country: "rs"},
        {name: "London", country: "uk"},
        {name: "Budapest", country: "hu"},
        {name: "Athens", country: "gr"}
      ]
    }
  },
  components: {
    CityWeatherList
  },
  created() {
    //nuxtServerInit(vuexContext, context) {
      
        
  },
  computed: {
    loadedPosts() {
        return this.$store.getters.loadedPosts
    },
    currentTemp() {
      return Math.round( this.weatherFahrenheit / 33.8)
    }
  },
}
</script>

<style scoped>

  .intro {
  height: 500px;
  position: relative;
  padding: 30px;
  box-sizing: border-box;
  background-image: url('~assets/images/background-1440.png');
  text-align: center;
  background-position: center;
  background-size: auto;
}

.intro h1 {
  /*position: absolute;
  top: 10%;
  left: 5%;*/
  font-family: 'Lato', sans-serif;
  width: auto;
  text-align: center;
  font-size: 60px !important;
  color: white;
  /*background-color: rgb(211, 211, 211);*/
  padding: 10px;
  border-radius: 10px;
  /*box-shadow: 3px 3px 3px black;*/
  /*box-sizing: border-box;
  border: 1px solid black;*/
}

@media (min-width: 768px) {
  .intro h1 {
    font-size: 2rem;
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

/*.post-preview {
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #ccc;
  background-color: white;
  width: 90%;
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .post-preview {
    width: 400px;
    margin: 10px;
  }
}

.post-thumbnail {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.post-content {
  padding: 10px;
  text-align: center;
}

.post-content h1 {
  margin:0px !important
}

.post-content p {
  margin:5px !important
}

a:hover .post-content,
a:active .post-content {
  background-color: #ccc;
}*/

.post-list {
  display: flex;
  padding: 0px 20px 20px 20px;
  box-sizing: border-box;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}
</style>
