<template>

		<tr>
			<td><input v-model="input"></td>
			<td class="latlng">{{lat}}</td>
			<td class="latlng">{{lng}}</td>
		</tr>

</template>

<script>

    import {State} from './state.js';
    export default {
        name: 'LookupResult',
        props: ['uid'],
        data() {
            return {
                input: null,
                lat: null,
                lng: null,

            }
        },
        watch: {
            input: function() {

                if (this.input == "") { // special case
                    this.lat = "";
                    this.lng = "";
                }

                var _this = this;
                this.geocode(this.input, function(data) {

                    data = JSON.parse(data);
                    _this.lat = _this.precisionRounding(data[0].lat, 2);
                    _this.lng = _this.precisionRounding(data[0].lon, 2); // OSM is wrong


                    var emit = {
                        name: _this.input,
                        latlng: [_this.lat, _this.lng],
                        uid: _this.uid
                    };

                    State.$emit('geocode', emit);

                });


            }
        },
        methods: {
            geocode: function(input, callback) {
                setTimeout(function() { // set the delay so we're not over RESTful requesting
                    var url = "http://nominatim.openstreetmap.org/search?q=" + input + "&format=json";
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
                }, 310);


            },
            precisionRounding: function(number, precision) {
                var factor = Math.pow(10, precision);
                var tempNumber = number * factor;
                var roundedTempNumber = Math.round(tempNumber);
                return roundedTempNumber / factor;
            },

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