<template>
   <div id="sidebar">
       <h1>{{title}}</h1>
       <table id="locations">
          <tbody>
              <tr>
                  <td>Location</td>
                  <td>Latitude</td>
                  <td>Longitude</td>
                  </tr>
      <lookup-result uid="1"> </lookup-result>
          </tbody>
          </table>
   </div>
</template>

<script>
    import LookupResult from './LookupResult.vue'
 
    export default {
        components: {
            'lookup-result': LookupResult
        },
        name: 'Sidebar',
        data() {
            return {
                title: "Quick Geocoder",
                compiledPoints: []
            }
        }
    }
</script>

<style lang="scss">
    #sidebar {
        float: left;
        width: 25%;
        background-color: white;
        height: 100%;
        position: fixed;
    }
    
    #locations {
        width: 90%;
        text-align: center;
    }
</style>