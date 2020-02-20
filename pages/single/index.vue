<template>
  <div class="single-post-page">
    <nuxt-link to="/single" class="single-card">
        <article>
          <div class="card-content">
            <SingleWeather 
                :city="location"
            />
            {{ location }}
          </div>
        </article>
      </nuxt-link>
  </div>
</template>

<script>
import SingleWeather from '@/components/Weather/SingleWeather'
import Axios from 'axios'

export default {
    data() {
        return {
            location: this.$route.params.city
        }
    }, 
  components: {
    SingleWeather
  },
  created() {
    /*Axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + this.$router.params.city + ',uk&appid=befe8baaa2bf08c42633d6903700839c')
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
            this.singlePlaceData.push(
              { temp: Math.round( (temp - 32) / 1.8), 
                humidity: humidity, 
                wind: wind,
                icon: icon,
                description: description 
              }
            )
          })
          .catch(e => context.error(e));
          console.log(this.singlePlaceData)*/
          //this.$router.push('/single')
    
  },
  computed: {
    /*postContent() {
      const getText = this.loadedPost.content.split("<br/>")
      return getText
    },*/
    /*...mapState([
      'comments'
    ]),*/
    /*loadedComments() {
      return this.$store.getters.loadedComments
    }*//*,
    idComments() {
      return this.$store.getters.idComments
    }*/
  },
  head: {
    title: 'News'
  }
};
</script>




<style scoped>
.single-post-page {
  /*padding: 30px;*/
  text-align: center;
  box-sizing: border-box;
}

.post {
  width: 100%;
}

@media (min-width: 768px) {
  .post {
    width: 58%;
    margin: auto;
  }
}

.post-title {
  margin: 0;
}

.post-details {
  padding: 10px;
  box-sizing: border-box;
  border-bottom: 3px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.post-content {
  text-align: justify;
}

@media (min-width: 768px) {
  .post-details {
    flex-direction: row;
  }
}


@media (max-width: 768px) {
  .back-arrow {
    display: none;
  }
  .post-content {
    padding: 0px 20px;
  }
  .post-feedback {
    width: 100% !important;
  }
}

.post-detail {
  color: rgb(88, 88, 88);
  margin: 0 10px;
}

.post-feedback {
  padding: 5px;
  border-bottom: 3px solid #ccc;
  width: 58%;
  margin: 0px auto;
}

.post-feedback a {
  color: red;
  text-decoration: none;
}

.post-feedback p {
  margin-bottom: 0px
}

.post-feedback a:hover,
.post-feedback a:active {
  color: salmon;
}

.intro {
  height: 300px;
  position: relative;
  padding: 30px;
  margin-bottom: 20px;
  box-sizing: border-box;
  /*background-image: url('https://s.gamerinfo.net/en/im/gamerinfonet-bigart.jpg');*/ /*~assets/images/main-page-background.jpg*/
  background-position: center;
  background-size: cover;
}

.back-arrow {
  width: 50px;
  height: 50px;
  position: absolute;
  border: 1px solid black;
  border-radius: 30px;
  background-color: #ccc;
  background-image: url('https://cdn.iconscout.com/icon/free/png-256/left-arrow-3-457866.png');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  opacity: 0.8;
}
</style>