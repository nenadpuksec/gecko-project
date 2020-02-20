<template>
    <nuxt-link :to="postLink" class="single-card">
        <article>
          <div class="card-icon" >
              <img :src="icon">
          </div>
          <div class="card-content">
            <h1>{{ description }}</h1>
            <p>Perception: - %</p>
            <p>Humidity: {{ humidity }}%</p>
            <p>Wind: {{ wind }} km/h</p>
            <h1>{{ currentTemp }}<span>&#8451;</span></h1>
            <h1>{{ city.name }}</h1>
            <!--<p>{{ testData }}</p>-->
          </div>
        </article>
      </nuxt-link>
</template>

<script>
import Axios from 'axios'

export default {
    name: 'PostPreview',
    props: {
        city: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            weatherFahrenheit: 0,
            perception: '',
            description: '',
            humidity: 0,
            wind: 0,
            icon: '',
            testData: [],
            id: 0,
            //root: require(`~/assets/images/${weatherIcon}.png`) //' + this.icon + '
        }
    },
    created() {
        Axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + this.city.name + ',' + this.city.country + '&appid=befe8baaa2bf08c42633d6903700839c')
          .then(res => {
            const postsArray = []
            for (const key in res.data) {
              postsArray.push({ ...res.data[key] })
            }
            //this.id = postsArray.id
            this.testData = postsArray
            this.weatherFahrenheit = postsArray[0].lat
            this.humidity = postsArray[3].humidity
            this.wind = postsArray[5].speed
            this.icon = require(`~/assets/images/${postsArray[1][0].icon}.png`)
            this.description = postsArray[1][0].description
            //this.perception = postsArray[1][0].icon
          })
          .catch(e => context.error(e));
    },
    computed: {
        postLink() {
            return '/posts/' + this.id //this.isAdmin ? '/admin/' + this.id : 
        },
        currentTemp() {
            return Math.round( (this.weatherFahrenheit - 32) / 1.8)
        },
        weatherIcon() {
            return this.icon
        }   
    }
}
</script>

<style scoped>
.single-card {
  /*border: 1px solid #ccc;*/
  /*box-shadow: 0 2px 2px #ccc;*/
  background-color: white;
  width: 90%;
  background-repeat: no-repeat;
  /*background-image: url('~assets/images/background-1440.png');*/
}

a {
  text-decoration: none;
  color: black;
}

@media (min-width: 850px) {
  .single-card {
    width: 200px;
    margin: 10px;
  }
}

.card-icon {
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
}

.card-content {
  height: auto;
  padding: 10px;
  text-align: center;
}

.card-content h1 {
  margin:0px !important;
  font-size: 16px !important;
}

.card-content p {
  margin:5px !important
}

a:hover .card-content,
a:active .card-content {
  background-color: #ccc;
}
</style>