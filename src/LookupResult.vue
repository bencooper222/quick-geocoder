<template>

		<tr>
			<td><input v-model="input"></td>
			<td class="latlng" v-if="lat">{{lat}}</td>
            <td class="latlng" v-else> <icon name="exclamation-triangle"></icon></td>
			<td class="latlng" v-if="lng">{{lng}}</td>
            <td class="latlng" v-else><icon name="exclamation-triangle"></icon></td>
		</tr>

</template>

<script>
    import {
        State
    } from './state.js';
    export default {
        name: 'LookupResult',
        props: ['uid'],
        data() {
            return {
                input: null,
                lat: null,
                lng: null,
                newest: true,
                delay: 450

            }
        },
        watch: {
            input: function() {

                if (this.input == "") { // special case
                    this.lat = "";
                    this.lng = "";
                } else {
                    if (this.newest) {

                        State.$emit('full', this.uid)
                    }

                    this.newest = false
                }

                var _this = this;

                this.geocode(this.input, function(data) {

                    _this.handleGeocode(data, true);

                });




            }
        },
        methods: {
            geocode: function(input, callback) {
                setTimeout(function() { // set the delay so we're not over RESTful requesting
                    var url = "https://nominatim.openstreetmap.org/search?q=" + input + "&format=json";
                    var xobj = new XMLHttpRequest();
                    xobj.overrideMimeType("application/json");
                    xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
                    xobj.onreadystatechange = function() {
                        if (xobj.readyState == 4 && xobj.status == "200") {
                            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                            callback(xobj.responseText);
                        }
                    };
                    xobj.send(null);
                }, this.delay);


            },
            precisionRounding: function(number, precision) {
                var factor = Math.pow(10, precision);
                var tempNumber = number * factor;
                var roundedTempNumber = Math.round(tempNumber);
                return roundedTempNumber / factor;
            },
            handleGeocode: function(data, tryAgain) {
                data = JSON.parse(data);
                console.log(data);

                if (data.length == 0) { // if no results

                    if (tryAgain) {
                        let _handleGeocode = this.handleGeocode;
                        this.geocode(this.input, function(data) {

                            _handleGeocode(data, false);

                        });
                    } else {


                        let emit = {
                            name: false,
                            latlng: [false, false],
                            uid: this.uid
                        }

                        State.$emit('geocode', emit);

                        this.lat = false;
                        this.lng = false;

                        return;
                    }
                }

                this.lat = this.precisionRounding(data[0].lat, 2);
                this.lng = this.precisionRounding(data[0].lon, 2); // OSM is wrong


                let emit = {
                    name: this.input,
                    latlng: [this.lat, this.lng],
                    uid: this.uid
                };

                State.$emit('geocode', emit);
            }

        }
    }
</script>

<style lang="scss">
    #input {
        float: left;
    }
    
    .latlng {
        background-color: grey;
        width: 22.5%;
    }
</style>