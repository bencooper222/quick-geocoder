<template>
  
    <l-marker :position="position" :title="title" :draggable="false">
      <l-popup :content="text"></l-popup>
    </l-marker>
</template>

<script>
    export default {

        name: 'MarkerPopup',
        props: ['position','title'],

        computed: {
            text: function(){
                return "<b>" + this.title + "</b><br>" 
                    + this.position[0] + ", " + this.position[1];
            }
        }
    }
</script>

<style lang="scss">

</style>