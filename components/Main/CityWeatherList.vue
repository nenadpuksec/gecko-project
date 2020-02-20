<template>
    <section class="single-card">
        <CityWeatherCard 
            v-for="city in cities"
            :key="city.id"
            :city="city"/>
    </section>
</template>

<script>
import CityWeatherCard from '@/components/Main/CityWeatherCard'

export default {
    props: {
        cities: {
            type: Array,
            required: true
        }
    },
    components: {
        CityWeatherCard
    }
}
</script>

<style scoped>
    .single-card {
        display: flex;
        padding: 20px;
        box-sizing: border-box;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }

    @media (max-width: 768px) {
        .single-card [data-v-2a183b29]{
            padding: 0px !important;
        }
    }
</style>