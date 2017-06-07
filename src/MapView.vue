<template>
<l-map :zoom="zoom" :center="center" :attributionControl="false" >
    <l-tilelayer :url="url" :attribution="attribution"></l-tilelayer>
    <marker-popup v-for="point in pointsArray" :position="point.latlng" :title="point.name" > </marker-popup>
    <marker-popup :position="center" title="Hello" > </marker-popup>
  </l-map>
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
                    0: {
                        name: "Vanderbilt University",
                        latlng: [36.14695, -86.803819]
                    }
                },
                pointsArray:[],
                url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
                attribution: 'vue-leaflet' // change to OSM

            }
        },
        computed: {
            
        },
        created: function() {
            State.$on("geocode", (data) => {
                this.addPoint(data);
            })
        },
        methods: {

            addPoint: function(data) {

                let alreadyExists = false;
                if(this.pointsDictionary[data.uid]!=undefined){
                    alreadyExists = true;
                }
                this.pointsDictionary[data.uid] = {};
                
            
                this.$set(this.pointsDictionary,data.uid,{
                    'name': data.name,
                    'latlng': data.latlng,
                    'uid': data.uid
                });
            //    this.pointsDictionary[data.uid]['name'] = data.name;
              //  this.pointsDictionary[data.uid]['latlng'] = data.latlng;

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



            },
            pointsArray2: function() {
                //console.log(this.pointsDictionary);
                let _pointsDictionary = this.pointsDictionary;
                var keys = Object.keys(_pointsDictionary);

                var values = keys.map(function(v) {
                    return _pointsDictionary[v];
                });
                
                return values;
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