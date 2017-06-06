<template>
   <div id="map">
      
   </div>
</template>

<script>
    import {
        State
    } from './state.js'
    export default {

        name: 'MapView',

        data() {
            return {
                L: require('leaflet'),
                center: [39.833, -98.58333], // https://goo.gl/XBu1SF USA USA USA   
                zoom: 4.5,
                points: {
                    0: {
                        name: "Vanderbilt University",
                        latlng: [36.14695, -86.803819]
        
                    

                    }
                },
                map: null

            }
        },
        created: function() {
            State.$on("geocode", (data) => {
                this.addPoint(data);
            })
        },
        mounted: function() {
            this.map = this.L.map('map').setView(this.center, this.zoom);
            this.L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map);

            this.plotPoints(); // for dev
        },
        watch: {
            zoom: function() {
                this.map.setView(this.center, this.zoom);
            },
            center: function() {
                this.map.setView(this.center, this.zoom); // check this
            }

        },
        methods: {
            plotPoints: function() { // may have performance problems later

                var _points = this.points;
                var _plotPoint = this.plotPoint;

                Object.keys(this.points).forEach(function(val, index, array) {
                    var value = _points[val];
                    _plotPoint(value,val);
                });
            },
            addPoint: function(data) {
                this.points[data.uid] = {};

                this.points[data.uid]['name'] = data.name;
                this.points[data.uid]['latlng'] = data.latlng;

              //  this.points[data.uid]["marker"] = null;
                this.plotPoint(data,data.uid);


            },
            plotPoint: function(value,uid) {
                console.log(JSON.stringify(this.points[uid]) + " hello");
                if(this.points[uid]["marker"]!=undefined){
             //       console.log(this.points);
                    console.log(uid);
                    this.map.removeLayer(this.points[uid]["marker"]);
                }
                                
                var marker = this.L.marker(value.latlng);
                marker.bindPopup("<b>" + value.name + "</b><br>" + value.latlng[0] + ", " + value.latlng[1]);
                this.points[uid]['marker'] = marker;
                console.log(marker);
                marker.addTo(this.map);
            }
        }
    }
</script>

<style lang="scss">
    #map {
        width: 75%;
        height: 100%;
        float: right;
        margin-left: 25%;
        position: relative;
        //   overflow: auto;
        z-index: 1;
    }
</style>