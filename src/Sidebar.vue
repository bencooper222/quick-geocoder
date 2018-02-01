<template>
   <div id="sidebar">
       <h1>{{title}}</h1>
       <table id="locations">
          <tbody>
              <tr>
                  <td>Location</td>
                  <td>&nbsp;&nbsp;Latitude&nbsp;&nbsp;</td>
                  <td >Longitude</td>
                  </tr>
      <lookup-result v-for="input in inputs" :uid="input" :key="input" :total="totalInputs"> </lookup-result>
          </tbody>
          </table>
   </div>
</template>

<script>
    import LookupResult from './LookupResult.vue'
      import {
        State
    } from './state.js';
 
    export default {
        components: {
            'lookup-result': LookupResult
        },
        name: 'Sidebar',
        created: function(){
            let _inputs = this.inputs
             State.$on("full", (data) => {

                if(_inputs[_inputs.length-1]==data){
                    _inputs.push(data+1);
                }
                
            });

             State.$on("spreadsheet", (data) => {

                if(_inputs[_inputs.length-1]==data){
                    _inputs.push(data+1);
                }
                
            });
        },
        data() {
            return {
                title: "Quick Geocoder",
                inputs: [0]
            }
        },
        computed: {
            totalInputs: function(){
                return this.inputs.length;
            }
        }
    }
</script>

<style lang="scss">
    #sidebar {
        float: left;
        width: 30%;
        background-color: white;
        height: 100%;
        position: fixed;
    }
    
    #locations {
        width: 91%;
        text-align: center;
        
    }
</style>