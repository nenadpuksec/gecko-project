<template>
    <nuxt-link to="/single" class="single-card">
        <article>
          <div class="card-icon" >
              <img :src="icon">
          </div>
          <div class="card-content">
            <h1>{{ description }}</h1>
            <p>Perception: - %</p>
            <p>Humidity: {{ humidity }}%</p>
            <p>Wind: {{ wind }} km/h</p>
            <h1>{{ temp }}<span>&#8451;</span></h1>
            <h1>{{ city }}</h1>
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
            type: String,
            required: true
        },
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
            id: 0
        }
    },
    created() {
        Axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + this.city + '&appid=befe8baaa2bf08c42633d6903700839c')
          .then(res => {
            const postsArray = []
            for (const key in res.data) {
              postsArray.push({ ...res.data[key] })
            }
            const temp = postsArray[0].lat
            const humidity = postsArray[3].humidity
            const wind = postsArray[5].speed
            const icon = require(`~/assets/images/${postsArray[1][0].icon}.png`)
            const description = postsArray[1][0].description
            this.temp = Math.round( (temp - 32) / 1.8)
            this.humidity = humidity
            this.wind = wind
            this.icon = icon
            this.description = description
          })
          .catch(e => context.error(e));
    }
}
</script>

<style scoped>
.single-card {
  background-color: white;
  width: 90%;
  background-repeat: no-repeat;
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