<template>
    <v-map :zoom="zoom" :center="center" id="map">
        <v-tilelayer :url="url"></v-tilelayer>

        <v-marker v-for="point in pointsDictionary" :key="point.uid" :lat-lng="point.latlng" :title="point.name" :draggable="false">
            <v-popup :content="formatHeader(point.latlng,point.name)"></v-popup>
        </v-marker>
        <!-- <marker-popup v-for="point in pointsArray" :position="point.latlng" :title="point.name" :key="point.uid" > </marker-popup> !-->

    </v-map>
</template>
<script>
    import {
        State
    } from './state.js'
    import MarkerPopup from './MarkerPopup.vue'
    export default {

        name: 'MapView',
        components: {
            'marker-popup': MarkerPopup
        },
        data() {

            return {

                center: [39.833, -98.58333], // https://goo.gl/XBu1SF USA USA USA   
                zoom: 4.5,
                pointsDictionary: {
       

                },

                url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attribution: 'vue-leaflet' // change to OSM

            }
        },

        created: function() {
            State.$on("geocode", (data) => {
                console.log(data);
                this.addPoint(data);
                
            })
        },
        methods: {

            addPoint: function(data) {
              //  this.$set(this.marker, 0, 32);

                let alreadyExists = false;
                if (this.pointsDictionary[data.uid] != undefined) {
                    alreadyExists = true;
                }
                //  this.pointsDictionary[data.uid] = {};


                this.$set(this.pointsDictionary, data.uid, {
                    'name': data.name,
                    'latlng': data.latlng,
                    'uid': data.uid
                });
                //    this.pointsDictionary[data.uid]['name'] = data.name;
                //  this.pointsDictionary[data.uid]['latlng'] = data.latlng;
                /*
                                //  this.points[data.uid]["marker"] = null;
                                if(alreadyExists){
                                    console.log("exists");
                                    var index = this.pointsArray.find(function(point){
                                        return point.uid == data.uid;
                                    });
                                    //this.$set(this.pointsArray,index,this.pointsDictionary[data.uid]);
                                    this.pointsArray.splice(index,1,this.pointsDictionary[data.uid]);
                                }
                                else {
                                      this.pointsArray.push(this.pointsDictionary[data.uid]);
                                }
                             

                                console.log(JSON.stringify(this.pointsDictionary));
                                console.log(JSON.stringify(this.pointsArray2()));

                 */

            },


            formatHeader: function(latlng, name) {
                return "<b>" + name + "</b><br>" +
                    latlng[0] + ", " + latlng[1];
            }

        }
    }
</script>

<style lang="scss">
    #map {
        width: 70%;
        height: 100%;
        float: right;
        margin-left: 25%;
        position: relative;
        //   overflow: auto;
        z-index: 1;
    }
</style>