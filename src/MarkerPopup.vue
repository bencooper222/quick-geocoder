<template>
  
    <v-marker :lat-lng="position" :title="title" :draggable="false">
      <v-popup :content="text"></v-popup>
    </v-marker>
</template>

<script>
    export default {

        name: 'MarkerPopup',
        props: ['position', 'title'],

        computed: {
            text: function() {
                return "<b>" + this.title + "</b><br>" +
                    this.position[0] + ", " + this.position[1];
            }
        },
        methods: {
           
            }
        }
    
</script>

<style lang="scss">

</style>