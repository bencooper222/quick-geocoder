<template>
   <div id="map">
      
   </div>
</template>

<script>
    export default {
        name: 'MapView',
        data() {
            return {
                L: require('leaflet'),
                center: [39.833, -98.58333], //https://goo.gl/XBu1SF USA USA US
                points: null

            }
        },
        mounted: function() {
            var map = this.L.map('map').setView(this.center, 4.5);
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);
        },
        methods: {

        }
    }
</script>

<style lang="scss">
    #map {
        width: 80%;
        height: 100%;
        float: right;
        margin-left: 20%;
        position: relative;
        overflow: auto;
        z-index: 1;
    }
</style>